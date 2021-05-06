import { AutoComplete, Col, Row, SelectProps } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { baseurl } from '../../auth';
import { AjaxJson } from '../../interface';
import { useFetchJson } from '../../tools/hook/useFetch';

interface responseType {
    ['article']: AjaxJson.article[];
    ['user']: AjaxJson.user[];
}

const Label: FC<{ name: string; content?: string }> = ({ name, content }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{name}</span>
        <span>{content}</span>
    </div>
);

// TODO: The fucking type!
const searchResult: (
    Response: responseType,
) => SelectProps<object>['options'] = (Response) =>
    Object.keys(Response)
        .map((name) =>
            name === 'article'
                ? Response[name].map((article) => ({
                      value: article.title,
                      label: (
                          <Label
                              name={article.title}
                              content={article.content.slice(1, 10)}
                          />
                      ),
                  }))
                : Response['user'].map((user) => ({
                      value: user.nickname,
                      label: <Label name={user.nickname} />,
                  })),
        )
        .reduce((prev, v) => [...prev, ...v], []);

export default function Searcher() {
    const [value, setValue] = useState('');
    const [searchHistory, setSearchHistory] = useState<
        SelectProps<object>['options']
    >([]);
    const H = useHistory();
    const [[response, l, error], f, c] = useFetchJson<{
        article: AjaxJson.article[];
        user: AjaxJson.userInfo[];
    }>({ url: baseurl + `/search?q=${value}` });
    if (searchHistory === undefined) {
        return null;
    }
    useEffect(() => {}, [value]);
    useEffect(() => {
        const result = ((sh: string | null) =>
            sh === null ? [] : JSON.parse(sh))(
            localStorage.getItem('searchHistory'),
        );
        if (
            result instanceof Array &&
            result.every((v) => typeof v === 'string') 
        ) {
            setSearchHistory(result);
        }
        return () => {
            localStorage.setItem(
                'searchHistory',
                JSON.stringify(
                    searchHistory.slice(
                        length - 5 < 0 ? 0 : length - 5,
                        length,
                    ),
                ),
            );
        };
    }, []);
    return (
        <AutoComplete
            options={searchHistory}
            onSearch={(value) => {
                H.push(`/search?q=${value}`);
            }}
        >
            <Search
                placeholder="what you want"
                allowClear
                enterButton="Search"
                size="middle"
                onChange={(value) => {
                    setValue(value.currentTarget.value);
                }}
            ></Search>
        </AutoComplete>
    );
}
