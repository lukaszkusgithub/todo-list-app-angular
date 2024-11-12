# TodoList App Angular with JSON Server

This project is a Todo List application built with Angular, and it uses **json-server** to simulate a backend API.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Backend server with JSON Server

To run a mock backend using `json-server`, follow the instructions below to get it up and running.

### Setting up JSON Server

1. **Install JSON Server**

   If you haven't installed `json-server` globally, you can install it via npm:

   ```bash
   npm install -g json-server
   ```

2. **Start the JSON Server**

In your project directory, create a file called db.json in the root folder. This file will simulate your backend data.

Example of db.json:
```json
{
  "tasks": [
    {
      "id": 1,
      "name": "Learn Angular",
      "done": false
    },
    {
      "id": 2,
      "name": "Learn JSON Server",
      "done": false
    }
  ]
}
```

3. **Run JSON Server**
After creating db.json, you can run json-server:

    ```bash
    json-server --watch db.json --port 3000
    ```

This will start the backend API on http://localhost:3000/, and it will simulate the necessary API endpoints (such as /tasks) for your application


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Summary of Setup
1. Backend: json-server running on http://localhost:3000/ to provide API for tasks (GET /tasks, POST /tasks, etc.).
2. Frontend: Angular frontend running on http://localhost:4200/ that communicates with the json-server API.
## API Endpoints

Fetch all tasks.
- GET /tasks 

Create a new task.
- POST /tasks 

Update a task by ID.
- PUT /tasks/

Delete a task by ID.
- DELETE /tasks/

## Example API Request
Fetching all tasks:

```bash
curl http://localhost:3000/tasks
```

Adding a new task:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"id": 3, "name": "New Task with custom ID", "done": false}' http://localhost:3000/tasks
```