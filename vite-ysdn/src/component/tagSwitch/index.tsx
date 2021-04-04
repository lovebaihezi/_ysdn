import { Row, Col, Tabs } from 'antd';
import React, { createContext, useContext, useMemo, useState } from 'react';
import './tags.css';
import Periodicals from '../../pages/Article/rightSide/periodicals';
import { FC } from 'react';

// function f({ name }: { name?: string }) {
//     const [state, setState] = useState<1 | 2>(1);
//     return (
//         <Row>
//             <Col span={18}>
//                 <Row>
//                     <Col span={24}>
//                         <Tabs
//                             defaultActiveKey="1"
//                             onChange={() => {
//                                 state === 1 ? setState(2) : setState(1);
//                             }}
//                         >
//                             <Tabs.TabPane key="1" tab="Newest">
//                                 {/* {App} */}
//                             </Tabs.TabPane>
//                             <Tabs.TabPane key="2" tab="Hottest">
//                                 {/* {App} */}
//                             </Tabs.TabPane>
//                         </Tabs>
//                     </Col>
//                     <Col span={24}></Col>
//                 </Row>
//             </Col>
//             <Col span={6} style={{ padding: 10 }}>
//                 <Row>
//                     <Col className="right" span={22} offset={1}>
//                         <Card>
//                             <Button
//                                 style={{
//                                     width: '100%',
//                                     fontSize: 24,
//                                     height: 'max-content',
//                                 }}
//                                 type="primary"
//                                 onClick={() => {
//                                     const id = sessionStorage.getItem('id');
//                                     if (id) {
//                                         location.href = `/${id}/update/article`;
//                                     } else {
//                                         location.href = `/login`;
//                                     }
//                                 }}
//                             >
//                                 <EditOutlined />
//                                 Write Article
//                             </Button>
//                         </Card>
//                     </Col>
//                     <Col className="right" span={22} offset={1}>
//                         <Card
//                             cover={
//                                 <img
//                                     src="http://dummyimage.com/400x300"
//                                     width="100%"
//                                 />
//                             }
//                             bodyStyle={{ padding: 0 }}
//                         ></Card>
//                     </Col>
//                     <Col className="right" span={22} offset={1}>
//                         <Card
//                             cover={
//                                 <img
//                                     src="http://dummyimage.com/400x300"
//                                     width="100%"
//                                 />
//                             }
//                             bodyStyle={{ padding: 0 }}
//                         ></Card>
//                     </Col>
//                     <Col span={22} offset={1}>
//                         <Periodicals name="article" />
//                     </Col>
//                 </Row>
//             </Col>
//         </Row>
//     );
// }

export const Tag = createContext<string>('');
export const useTag = () => useContext(Tag);

const TagSwitch: FC<{
    tags: string[];
    tabBarExtraContent?: React.ReactNode;
    RightSideContent?: React.ReactNode;
}> = ({ tags, tabBarExtraContent, children, RightSideContent }) => {
    const [state, setState] = useState<string>(tags[0]);
    const App = useMemo(() => children, [state]);
    return (
        <Row>
            <Col span={24}>
                <Tabs
                    defaultActiveKey="0"
                    tabBarExtraContent={tabBarExtraContent}
                    onChange={(e) => {
                        setState(tags[Number.parseInt(e)]);
                    }}
                >
                    {tags.map((tag, index) => (
                        <Tabs.TabPane key={index} tab={tag}>
                            <Row wrap={false}>
                                <Col flex="auto">
                                    <Tag.Provider value={state}>
                                        {App}
                                    </Tag.Provider>
                                </Col>
                                {RightSideContent && (
                                    <Col span={6}>{RightSideContent}</Col>
                                )}
                            </Row>
                        </Tabs.TabPane>
                    ))}
                </Tabs>
            </Col>
        </Row>
    );
};

export default TagSwitch;
