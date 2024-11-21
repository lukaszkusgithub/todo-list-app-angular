# TodoList App Angular with JSON Server

This project is a Todo List application built with Angular, and it uses **json-server** to simulate a backend API for tasks.

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

2. **Create db.json File**

   In your project directory, create a file called `db.json` in the root folder. This file will simulate your backend data. Here’s an example of what it might look like:

   ```json
   {
     "tasks": [
       {
         "id": 1,
         "name": "Learn Angular",
         "createdAt": 0,
         "done": false
       },
       {
         "id": 2,
         "name": "Learn JSON Server",
         "createdAt": 0,
         "done": false
       }
     ]
   }
   ```

3. **Run JSON Server**

   After creating `db.json`, you can run `json-server` to start the mock backend:

   ```bash
   json-server --watch db.json --port 3000
   ```

   This will start the backend API on `http://localhost:3000/` and will automatically create routes for CRUD operations on your `tasks`. 

4. **Enable CORS for the Backend** *(Optional but recommended)*

   If you're facing CORS issues (cross-origin resource sharing), you can install and configure `json-server` to handle them:

   ```bash
   npm install -g json-server
   json-server --watch db.json --port 3000 --host 0.0.0.0 --cors
   ```

   This will allow the frontend app to make requests from any origin.

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

1. **Backend**: `json-server` running on `http://localhost:3000/` to provide API for tasks (GET `/tasks`, POST `/tasks`, etc.).
2. **Frontend**: Angular frontend running on `http://localhost:4200/` that communicates with the `json-server` API.

## API Endpoints

### Fetch all tasks
```bash
GET /tasks
```

### Create a new task
```bash
POST /tasks
```

Request Body:
```json
{
  "name": "New Task",
  "done": false
}
```

### Update a task by ID
```bash
PUT /tasks/:id
```

Request Body:
```json
{
  "id": 1,
  "name": "Updated Task",
  "done": true
}
```

### Delete a task by ID
```bash
DELETE /tasks/:id
```

## Example API Request

### Fetching all tasks
```bash
curl http://localhost:3000/tasks
```

### Adding a new task:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name": "New Task", "done": false}' http://localhost:3000/tasks
```

### Updating a task by ID:
```bash
curl -X PUT -H "Content-Type: application/json" -d '{"id": 1, "name": "Updated Task", "done": true}' http://localhost:3000/tasks/1
```

### Deleting a task by ID:
```bash
curl -X DELETE http://localhost:3000/tasks/1
```
