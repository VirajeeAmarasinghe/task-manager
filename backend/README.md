# Task Manager Backend

This is the Laravel backend for the Task Manager application.

## Requirements

-   PHP >= 8.1
-   Composer
-   SQLite (default, but you can use MySQL or another supported DB)

## Setup Instructions

1. **Clone the repository**

    ```bash
    git clone https://github.com/your-username/task-manager.git
    cd task-manager/backend
    ```

2. **Install dependencies**

    ```bash
    composer install
    ```

3. **Copy and configure environment file**

    ```bash
    cp .env.example .env
    ```

    Edit `.env` and set your database connection to SQLite:

    ```
    DB_CONNECTION=sqlite
    DB_DATABASE=/absolute/path/to/database.sqlite
    ```

    > **Tip:** You can use `DB_DATABASE=${PWD}/database/database.sqlite` on Linux/macOS or set the full path on Windows.

4. **Create the SQLite database file**

    ```bash
    touch database/database.sqlite
    ```

    > On Windows, you can create an empty file manually or use:
    >
    > ```
    > type nul > database\database.sqlite
    > ```

5. **Generate application key**

    ```bash
    php artisan key:generate
    ```

6. **Run migrations**

    ```bash
    php artisan migrate
    ```

7. **(Optional) Seed the database**

    ```bash
    php artisan db:seed
    ```

8. **Install JWT Auth package (if not already installed)**

    ```bash
    composer require tymon/jwt-auth
    php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
    php artisan jwt:secret
    ```

9. **Start the development server**

    ```bash
    php artisan serve
    ```

    The API will be available at `http://localhost:8000`.

## Useful Commands

-   Run tests:

    ```bash
    php artisan test
    ```

-   Clear cache:
    ```bash
    php artisan config:clear
    php artisan cache:clear
    php artisan route:clear
    php artisan view:clear
    ```

## API Documentation

-   The API follows RESTful conventions.
-   Authentication uses JWT (JSON Web Token).
-   Endpoints include `/api/login`, `/api/register`, `/api/tasks`, etc.

## License

This project is open-source and available under the [MIT license](../LICENSE)
