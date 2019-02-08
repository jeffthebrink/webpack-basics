import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AsyncTitle as Title } from './AsyncTitle';

ReactDOM.render(
  (
    <Title text="Is this thing on?" />
  ),
  document.getElementById('root'),
);
