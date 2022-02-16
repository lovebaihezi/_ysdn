import React, { useEffect, useState } from 'react';
import ChartistGraph from 'react-chartist';
import { makeStyles } from '@material-ui/core/styles';
import Update from '@material-ui/icons/Update';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import AccessTime from '@material-ui/icons/AccessTime';
import Accessibility from '@material-ui/icons/Accessibility';
import Description from '@material-ui/icons/Description';
// import BugReport from '@material-ui/icons/BugReport';
// import Code from '@material-ui/icons/Code';
import Cloud from '@material-ui/icons/Cloud';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
// import Tasks from 'components/Tasks/Tasks.js';
import CustomTabs from 'components/CustomTabs/CustomTabs.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardIcon from 'components/Card/CardIcon.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import { CircularProgress } from '@material-ui/core';
// import { Redirect } from 'react-router-dom';

import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart,
} from 'variables/charts.js';

const baseurl = 'http://localhost:5050';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
// import { useAuth } from 'index';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(styles);

export const UserQuantityAllTime = () => {
    const classes = useStyles();
    const [res, setRes] = useState(undefined);
    useEffect(() => {
        fetch(`${baseurl}/admin/wholeUser`)
            .then((res) => res.text())
            .then((a) => setRes(a));
    }, []);
    return (
        <Card>
            <CardHeader color="info" stats icon>
                <CardIcon color="info">
                    <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>全部用户</p>
                <h3 className={classes.cardTitle}>
                    {res === undefined ? <CircularProgress /> : res}
                </h3>
            </CardHeader>
            <CardFooter stats>
                <div className={classes.stats}>
                    <Update />
                    所有时间
                </div>
            </CardFooter>
        </Card>
    );
};

export const ArticleQuantityAllTime = () => {
    const classes = useStyles();
    const [res, setRes] = useState(undefined);
    useEffect(() => {
        fetch(`${baseurl}/admin/wholeArticle`)
            .then((res) => res.text())
            .then((a) => setRes(a));
    }, []);
    return (
        <Card>
            <CardHeader color="info" stats icon>
                <CardIcon color="info">
                    <Description />
                </CardIcon>
                <p className={classes.cardCategory}>全部文章</p>
                <h3 className={classes.cardTitle}>
                    {res === undefined ? <CircularProgress /> : res}
                </h3>
            </CardHeader>
            <CardFooter stats>
                <div className={classes.stats}>
                    <Update />
                    所有时间
                </div>
            </CardFooter>
        </Card>
    );
};

export const UserQuantityThisWeek = () => {
    const classes = useStyles();
    const [res, setRes] = useState(undefined);
    useEffect(() => {
        fetch(`${baseurl}/admin/thisWeekUser`)
            .then((res) => res.text())
            .then((a) => setRes(a));
    }, []);
    return (
        <Card>
            <CardHeader color="info" stats icon>
                <CardIcon color="info">
                    <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>本周用户新增</p>
                <h3 className={classes.cardTitle}>
                    {res === undefined ? <CircularProgress /> : res}
                </h3>
            </CardHeader>
            <CardFooter stats>
                <div className={classes.stats}>
                    <Update />
                    上周
                </div>
            </CardFooter>
        </Card>
    );
};

const KMeans = () => {
    const [result, setResult] = useState(undefined);
    useEffect(() => {
        fetch(`${baseurl}/admin/kmeans`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ k: 5 }),
        })
            .then((res) => res.json())
            .then(setResult);
    }, []);
    return result ? (
        <CustomTabs
            title="KMeans"
            headerColor="primary"
            tabs={result.map((tags, index) => ({
                tabName: `${index}`,
                tabIcon: Cloud,
                tabContent: (
                    <Table
                        tableHeaderColor="primary"
                        tableHead={['nickname', 'tags']}
                        tableData={tags.map(([nickname, ...tags]) => [
                            nickname,
                            tags.join(' '),
                        ])}
                    />
                ),
            }))}
        />
    ) : (
        <Skeleton />
    );
};

export const ArticleQuantityThisWeek = () => {
    const classes = useStyles();
    const [res, setRes] = useState(undefined);
    useEffect(() => {
        fetch(`${baseurl}/admin/thisWeekArticle`)
            .then((res) => res.text())
            .then((a) => setRes(a));
    }, []);
    return (
        <Card>
            <CardHeader color="info" stats icon>
                <CardIcon color="success">
                    <Description />
                </CardIcon>
                <p className={classes.cardCategory}>本周文章新增</p>
                <h3 className={classes.cardTitle}>
                    +{res === undefined ? <CircularProgress /> : res}
                </h3>
            </CardHeader>
            <CardFooter stats>
                <div className={classes.stats}>
                    <Update />
                    上周
                </div>
            </CardFooter>
        </Card>
    );
};

const FpGrowth = () => {
    const classes = useStyles();
    const [result, setResult] = useState(undefined);
    useEffect(() => {
        fetch(`${baseurl}/admin/FpGrowth`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ sup: 0.01 }),
        })
            .then((res) => res.json())
            .then(setResult);
    }, []);
    return (
        <Card>
            {result ? (
                <>
                    <CardHeader color="warning">
                        <h4 className={classes.cardTitleWhite}>
                            FpGrowth算法结果
                        </h4>
                        <p className={classes.cardCategoryWhite}>
                            Min Sup: 0.01
                        </p>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={['tags', 'sup']}
                            // [
                            //     ['1', 'Dakota Rice', '$36,738', 'Niger'],
                            //     ['2', 'Minerva Hooper', '$23,789', 'Curaçao'],
                            //     [
                            //         '3',
                            //         'Sage Rodriguez',
                            //         '$56,142',
                            //         'Netherlands',
                            //     ],
                            //     [
                            //         '4',
                            //         'Philip Chaney',
                            //         '$38,735',
                            //         'Korea, South',
                            //     ],
                            // ]
                            tableData={result
                                .filter(({ items }) => items.length > 1)
                                .map(({ items, support }) => [
                                    items.join(' '),
                                    support,
                                ])}
                        />
                    </CardBody>
                </>
            ) : (
                <Skeleton />
            )}
        </Card>
    );
};

export default function Dashboard() {
    // const [session] = useAuth();
    // if (session === null) {
    //     return <Redirect to="/" />;
    // }
    const classes = useStyles();
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={6} md={3}>
                    <UserQuantityAllTime />
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                    <UserQuantityThisWeek />
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                    <ArticleQuantityAllTime />
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                    <ArticleQuantityThisWeek />
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                    <Card chart>
                        <CardHeader color="success">
                            <ChartistGraph
                                className="ct-chart"
                                data={dailySalesChart.data}
                                type="Line"
                                options={dailySalesChart.options}
                                listener={dailySalesChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>本周用户新增</h4>
                            <p className={classes.cardCategory}>
                                <span className={classes.successText}>
                                    <ArrowUpward
                                        className={classes.upArrowCardCategory}
                                    />
                                    55%
                                </span>
                                increase in today sales.
                            </p>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime /> updated just now
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card chart>
                        <CardHeader color="warning">
                            <ChartistGraph
                                className="ct-chart"
                                data={emailsSubscriptionChart.data}
                                type="Bar"
                                options={emailsSubscriptionChart.options}
                                responsiveOptions={
                                    emailsSubscriptionChart.responsiveOptions
                                }
                                listener={emailsSubscriptionChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>本周文章新增</h4>
                            <p className={classes.cardCategory}>
                                Last Campaign Performance
                            </p>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime /> updated just now
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card chart>
                        <CardHeader color="danger">
                            <ChartistGraph
                                className="ct-chart"
                                data={completedTasksChart.data}
                                type="Line"
                                options={completedTasksChart.options}
                                listener={completedTasksChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>
                                Completed Tasks
                            </h4>
                            <p className={classes.cardCategory}>
                                Last Campaign Performance
                            </p>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime /> updated just now
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <KMeans />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <FpGrowth />
                </GridItem>
            </GridContainer>
        </div>
    );
}
