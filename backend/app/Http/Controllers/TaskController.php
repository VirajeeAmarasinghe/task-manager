<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->query('status'); // all, completed, pending
        $query = Auth::user()->tasks();

        if ($status === 'completed')
            $query->where('completed', true);
        elseif ($status === 'pending')
            $query->where('completed', false);

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $task = Auth::user()->tasks()->create($request->only('title', 'description'));

        return response()->json($task, 201);
    }

    public function update(Request $request, $id)
    {
        $task = Auth::user()->tasks()->findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $task->update($request->only('title', 'description', 'completed'));

        return response()->json($task);
    }

    public function destroy($id)
    {
        $task = Auth::user()->tasks()->findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Task deleted']);
    }

    public function complete($id)
    {
        $task = Auth::user()->tasks()->findOrFail($id);
        $task->update(['completed' => true]);

        return response()->json(['message' => 'Task marked as completed']);
    }
}
