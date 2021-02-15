import React from 'react';
import utils from '../utils';
import * as tools from '../tools';

export interface formFc<
    formArgument = {},
    initialArgument = {},
    WarningArgument = {},
    waitingArgument = {},
    parsingArgument = {},
    errorArgument = {},
    fullfilArgument = {}
> extends React.FC<{
        FormElement: React.FC<formArgument>;
        InitialElement: React.FC<initialArgument>;
        WarningElement: React.FC<WarningArgument>;
        WaitingElement: React.FC<waitingArgument>;
        ParsingElement: React.FC<parsingArgument>;
        ErrorElement: React.FC<errorArgument>;
        FullfilElement: React.FC<fullfilArgument>;
    }> {}

//* : first step : status render in form,  *complete! ✔
//* : Next step : status render should be the argument(, and logic should also be an argument ?,but i guess this would cause leak of perform ) ✔
//TODO : * Next step : let form become useForm ,consider useForm

// function useForm<
//     formArgument extends {} = {},
//     initialArgument extends {} = {},
//     waitingArgument extends {} = {},
//     parsingArgument extends {} = {},
//     errorArgument extends {} = {},
//     fullfilArgument extends {} = {}
// >({
//     FormElement,
//     InitialElement,
//     WaitingElement,
//     ParsingElement,
//     ErrorElement,
//     FullfilElement,
// }: {
//     FormElement: React.FC<formArgument>;
//     InitialElement: React.FC<initialArgument>;
//     WaitingElement: React.FC<waitingArgument>;
//     ParsingElement: React.FC<parsingArgument>;
//     ErrorElement: React.FC<errorArgument>;
//     FullfilElement: React.FC<fullfilArgument>;
// }) {
//     const Form: formFc<
//         formArgument,
//         initialArgument,
//         waitingArgument,
//         parsingArgument,
//         errorArgument,
//         fullfilArgument
//     > = () => {
//         const [res, err, Fetch, Catch] = utils.useEveryFetch();
//         const [Json, setJson] = React.useState<unknown>();
//         const [Render, setRender] = React.useState<JSX.Element>(
//             <InitialElement />
//         );
//         const [clicked, setClick] = React.useState<boolean>(false);
//         async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//             e.preventDefault();
//             if (!clicked) {
//                 setClick(true);
//                 setRender(<WaitingElement />);
//                 const formData = tools.formTake(e.currentTarget);
//                 try {
//                     await Fetch('http://localhost:8000/user/login', {
//                         method: 'post',
//                         body: JSON.stringify(formData),
//                         headers: new Headers({
//                             'Content-Type': 'application/json',
//                         }),
//                     });
//                     setRender(<ParsingElement />);
//                     setJson(await res?.json());
//                     setRender(<FullfilElement />);
//                 } catch (e) {
//                     Catch(e);
//                     setClick(true);
//                 }
//             }
//         }
//         React.useEffect(() => {
//             if (!res) {
//                 setClick(false);
//             }
//             return () => {};
//         }, [res]);
//         React.useEffect(() => {
//             if (err) {
//                 setRender(<ErrorElement error={err} />);
//             } else if (res?.status === 200) {
//                 setRender(<FullfilElement />);
//             } else if (res?.status === 404) {
//                 setClick(true);
//                 setRender(<ErrorElement error={new Error('404 Not Found!')} />);
//             }
//             return () => {};
//         }, [err, res, Json, ErrorElement, FullfilElement]);
//         return (
//             <FormElement
//                 hooks={handleSubmit}
//                 State={Render}
//                 clickState={clicked}
//             />
//         );
//     };
//     return Form;
// }
/*
  TODO : 1. 加入状态传递
  TODO : 2. url以及form提交函数抽离,
  TODO : 3. 做成useForm函数,泛型多参... // 或者是form容器,将逻辑拆离开???待思考,先简单完成
*/
export const Form: formFc<
    {
        hooks: (e: React.FormEvent<HTMLFormElement>) => void;
        clickState: boolean;
        State: JSX.Element;
    },
    {},
    { msg: { msg: string } },
    {},
    {},
    { error: Error }
> = ({
    FormElement,
    InitialElement,
    WarningElement,
    WaitingElement,
    ParsingElement,
    ErrorElement,
    FullfilElement,
}) => {
    const [res, err, Fetch, Catch] = utils.useEveryFetch();
    const [Json, setJson] = React.useState<unknown>();
    const [Render, setRender] = React.useState<JSX.Element>(<InitialElement />);
    const [clicked, setClick] = React.useState<boolean>(false);
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!clicked) {
            setClick(true);
            setRender(<WaitingElement />);
            const rules = {};
            setRender(
                <WarningElement msg={tools.formCheck(e.currentTarget, rules)} />
            );
            const formData = tools.formTake(e.currentTarget);
            try {
                await Fetch('http://localhost:8000/user/login', {
                    method: 'post',
                    body: JSON.stringify(formData),
                    headers: new Headers({
                        'Content-Type': 'application/json',
                    }),
                });
                setRender(<ParsingElement />);
                setJson(await res?.json());
                setRender(<FullfilElement />);
            } catch (e) {
                Catch(e);
                setClick(true);
            }
        }
    }
    React.useEffect(() => {
        if (!res) {
            setClick(false);
        }
        return () => {};
    }, [res]);
    React.useEffect(() => {
        if (err) {
            setRender(<ErrorElement error={err} />);
        } else if (res?.status === 200) {
            setRender(<FullfilElement />);
        } else if (res?.status === 404) {
            setClick(true);
            setRender(<ErrorElement error={new Error('404 Not Found!')} />);
        }
        return () => {};
    }, [err, res, Json, ErrorElement, FullfilElement]);
    return (
        <FormElement hooks={handleSubmit} State={Render} clickState={clicked} />
    );
};
