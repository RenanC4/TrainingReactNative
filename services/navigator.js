import { NavigationActions } from 'react-navigation';
import { NavigationParams, NavigationRoute } from 'react-navigation';

let _container;

function setContainer(container) {
  _container = container;
}

function reset(routeName, NavigationParams) {
  _container.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            type: 'Navigation/NAVIGATE',
            routeName,
            NavigationParams,
          }),
        ],
      }),
  );
}

function navigate(routeName, NavigationParams) {
  _container.dispatch(
      NavigationActions.navigate({
        type: 'Navigation/NAVIGATE',
        routeName,
        NavigationParams,
      }),
  );
}



export default {
  setContainer,
  navigate,
  reset,
};