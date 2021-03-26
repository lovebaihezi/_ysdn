import { RouteProps } from 'react-router-dom';

const Combine = (Container: React.FC<{ Except: JSX.Element } & RouteProps>) => (
    Routes: Array<JSX.Element>,
    Expects: Array<JSX.Element>,
    RouteProps: Array<RouteProps>
) =>
    Routes.map((v, i) => (
        <Container {...RouteProps[i]} Except={Expects[i]}>
            {v}
        </Container>
    ));
