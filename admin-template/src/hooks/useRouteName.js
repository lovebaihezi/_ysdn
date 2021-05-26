import routes from 'routes';

export const useRouteName = () => {
    // let name = '';
    // routes.forEach((route) => {
    //     if (window.location.href.indexOf(route.layout + route.path) !== -1) {
    //         name = routes.rtlActive ? route.rtlName : route.name;
    //     }
    // });
    // return name;
    return routes.reduce(
        (prev, route) =>
            window.location.href.indexOf(route.layout + route.path) !== -1
                ? routes.rtlActive
                    ? route.rtlName
                    : route.name
                : prev,
        '',
    );
};
