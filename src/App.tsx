/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  getTodos().then(res => {
    setTodos(res);
    setIsLoaded(true);
  });

  const handleShowUser = () => {
    setIsUserLoading(true);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {!isLoaded && <Loader />}
              <TodoList
                todos={todos}
                handleShowUser={handleShowUser}
              />
            </div>
          </div>
        </div>
      </div>

      {isUserLoading && <TodoModal />}
    </>
  );
};
