import { asyncComponent } from 'react-async-component';

const AsyncTitle = asyncComponent({
  resolve: () => import('./Title').then(module => module.Title),
});

export {
  AsyncTitle,
}
