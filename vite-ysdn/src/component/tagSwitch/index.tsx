import { Row, Col, Tabs } from 'antd';
import React, { createContext, useContext, useMemo, useState } from 'react';
import './tags.css';
import { FC } from 'react';

export const Tag = createContext<string>('');
export const useTag = () => useContext(Tag);

export const InnerTag: FC<{
    Component: React.FC<{ OuterTag: string }>;
    tags: string[];
}> = ({ Component, tags }) => {
    const tag = useTag();
    return (
        <TagSwitch tags={tags}>
            <Component OuterTag={tag} />
        </TagSwitch>
    );
};

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
