"use strict";

$(document).ready(function () {
    //Line chart
    if ($("#billboardjs-chart-1").length) {
        var chart = bb.generate({
            data: {
                columns: [
                    ["data1", 30, 200, 100, 400, 150, 250],
                    ["data2", 50, 20, 10, 40, 15, 25],
                ],
                colors: {
                    data1: themeColors.accent,
                    data2: themeColors.secondary,
                    data3: themeColors.orange,
                },
            },
            size: {
                height: 280,
            },
            padding: {
                bottom: 20,
            },
            title: {
                text: "Line Chart",
                position: "top-left",
                padding: {
                    bottom: 20,
                    right: 20,
                    top: 0,
                    left: 20,
                },
            },
            legend: {
                position: "inset",
            },
            bindto: "#billboardjs-chart-1",
        });

        setTimeout(function () {
            chart.load({
                columns: [["data1", 230, 190, 300, 500, 300, 400]],
            });
        }, 5000);

        setTimeout(function () {
            chart.load({
                columns: [["data3", 130, 150, 200, 300, 200, 100]],
            });
        }, 6500);

        setTimeout(function () {
            chart.unload({
                ids: "data1",
            });
        }, 7000);
    }

    //Line chart with regions
    if ($("#billboardjs-chart-2").length) {
        var chart2 = bb.generate({
            data: {
                columns: [
                    ["data1", 30, 200, 100, 400, 150, 250],
                    ["data2", 50, 20, 10, 40, 15, 25],
                ],
                colors: {
                    data1: themeColors.accent,
                    data2: themeColors.secondary,
                    data3: themeColors.orange,
                },
                regions: {
                    data1: [
                        {
                            start: 1,
                            end: 2,
                            style: {
                                dasharray: "6 2",
                            },
                        },
                        {
                            start: 3,
                            style: {
                                dasharray: "2 3",
                            },
                        },
                    ],
                    data2: [
                        {
                            end: 3,
                        },
                    ],
                },
            },
            size: {
                height: 280,
            },
            padding: {
                bottom: 20,
            },
            title: {
                text: "Line Chart with Regions",
                position: "top-left",
                padding: {
                    bottom: 20,
                    right: 20,
                    top: 0,
                    left: 20,
                },
            },
            legend: {
                position: "inset",
            },
            bindto: "#billboardjs-chart-2",
        });
    }

    //Area Chart
    if ($("#billboardjs-chart-3").length) {
        var chart3 = bb.generate({
            data: {
                columns: [
                    ["data1", 300, 350, 300, 0, 0, 0],
                    ["data2", 130, 100, 140, 200, 150, 50],
                ],
                colors: {
                    data1: themeColors.accent,
                    data2: themeColors.secondary,
                    data3: themeColors.orange,
                },
                types: {
                    data1: "area",
                    data2: "area-spline",
                },
            },
            size: {
                height: 280,
            },
            padding: {
                bottom: 20,
            },
            title: {
                text: "Area Chart",
                position: "top-left",
                padding: {
                    bottom: 20,
                    right: 20,
                    top: 0,
                    left: 20,
                },
            },
            legend: {
                position: "inset",
            },
            bindto: "#billboardjs-chart-3",
        });
    }

    //Area Range Chart
    if ($("#billboardjs-chart-4").length) {
        var chart4 = bb.generate({
            data: {
                x: "x",
                columns: [
                    [
                        "x",
                        "2013-01-01",
                        "2013-01-02",
                        "2013-01-03",
                        "2013-01-04",
                        "2013-01-05",
                        "2013-01-06",
                    ],
                    [
                        "data1",
                        [150, 140, 110],
                        [155, 130, 115],
                        [160, 135, 120],
                        [135, 120, 110],
                        [180, 150, 130],
                        [199, 160, 125],
                    ],
                    ["data2", 130, 340, 200, 500, 250, 350],
                ],
                colors: {
                    data1: themeColors.accent,
                    data2: themeColors.secondary,
                    data3: themeColors.orange,
                    data4: themeColors.purple,
                },
                types: {
                    data1: "area-line-range",
                },
            },
            axis: {
                x: {
                    type: "timeseries",
                    tick: {
                        format: "%Y-%m-%d",
                    },
                },
            },
            size: {
                height: 280,
            },
            padding: {
                bottom: 20,
            },
            title: {
                text: "Area Range Chart",
                position: "top-left",
                padding: {
                    bottom: 20,
                    right: 20,
                    top: 0,
                    left: 20,
                },
            },
            legend: {
                position: "inset",
            },
            bindto: "#billboardjs-chart-4",
        });

        setTimeout(function () {
            chart4.load({
                columns: [
                    [
                        "data3",
                        [220, 215, 205],
                        [240, 225, 215],
                        [260, 235, 225],
                        [280, 245, 235],
                        [270, 255, 225],
                        [240, 225, 215],
                    ],
                ],
                types: {
                    data3: "area-spline-range",
                },
            });
        }, 1000);

        setTimeout(function () {
            chart4.load({
                columns: [
                    [
                        "data4",
                        {high: 155, low: 145, mid: 150},
                        {high: 200, mid: 190, low: 150},
                        {high: 230, mid: 215, low: 200},
                        {high: 210, mid: 200, low: 180},
                        {high: 220, mid: 210, low: 190},
                        {high: 200, mid: 180, low: 160},
                    ],
                ],
                types: {
                    data4: "area-spline-range",
                },
            });
        }, 1500);
    }

    //Bar Chart
    if ($("#billboardjs-chart-5").length) {
        var chart5 = bb.generate({
            data: {
                columns: [
                    ["data1", 30, 200, 100, 400, 150, 250],
                    ["data2", 130, 100, 140, 200, 150, 50],
                ],
                colors: {
                    data1: themeColors.accent,
                    data2: themeColors.secondary,
                    data3: themeColors.orange,
                    data4: themeColors.purple,
                },
                type: "bar",
            },
            bar: {
                width: {
                    ratio: 0.5,
                },
            },
            size: {
                height: 280,
            },
            padding: {
                bottom: 20,
            },
            title: {
                text: "Bar Chart",
                position: "top-left",
                padding: {
                    bottom: 20,
                    right: 20,
                    top: 0,
                    left: 20,
                },
            },
            legend: {
                position: "inset",
            },
            bindto: "#billboardjs-chart-5",
        });

        setTimeout(function () {
            chart5.load({
                columns: [["data3", 130, -150, 200, 300, -200, 100]],
            });
        }, 1000);
    }

    //Stacked Bar Chart
    if ($("#billboardjs-chart-6").length) {
        var chart6 = bb.generate({
            data: {
                columns: [
                    ["data1", -30, 200, 200, 400, -150, 250],
                    ["data2", 130, 100, -100, 200, -150, 50],
                    ["data3", -230, 200, 200, -300, 250, 250],
                ],
                colors: {
                    data1: themeColors.accent,
                    data2: themeColors.secondary,
                    data3: themeColors.orange,
                    data4: themeColors.purple,
                },
                type: "bar",
                groups: [["data1", "data2"]],
            },
            grid: {
                y: {
                    lines: [
                        {
                            value: 0,
                        },
                    ],
                },
            },
            size: {
                height: 280,
            },
            padding: {
                bottom: 20,
            },
            title: {
                text: "Stacked Bar Chart",
                position: "top-left",
                padding: {
                    bottom: 20,
                    right: 20,
                    top: 0,
                    left: 20,
                },
            },
            legend: {
                position: "inset",
            },
            bindto: "#billboardjs-chart-6",
        });

        setTimeout(function () {
            chart6.groups([["data1", "data2", "data3"]]);
        }, 1000);

        setTimeout(function () {
            chart6.load({
                columns: [["data4", 100, -50, 150, 200, -300, -100]],
            });
        }, 1500);

        setTimeout(function () {
            chart6.groups([["data1", "data2", "data3", "data4"]]);
        }, 2000);
    }

    //Step Bar Chart
    if ($("#billboardjs-chart-7").length) {
        var chart7 = bb.generate({
            data: {
                columns: [
                    ["data1", 300, 350, 300, 0, 0, 100],
                    ["data2", 130, 100, 140, 200, 150, 50],
                ],
                colors: {
                    data1: themeColors.accent,
                    data2: themeColors.secondary,
                    data3: themeColors.orange,
                    data4: themeColors.purple,
                },
                types: {
                    data1: "step",
                    data2: "area-step",
                },
            },
            size: {
                height: 280,
            },
            padding: {
                bottom: 20,
            },
            title: {
                text: "Step Chart",
                position: "top-left",
                padding: {
                    bottom: 20,
                    right: 20,
                    top: 0,
                    left: 20,
                },
            },
            legend: {
                position: "inset",
            },
            bindto: "#billboardjs-chart-7",
        });
    }

    //Stacked Bar Chart
    if ($("#billboardjs-chart-8").length) {
        var chart8 = bb.generate({
            data: {
                columns: [
                    ["data1", 30, 200, 100, 400, 150, 250],
                    ["data2", 130, 100, 140, 200, 150, 50],
                ],
                colors: {
                    data1: themeColors.accent,
                    data2: themeColors.secondary,
                    data3: themeColors.orange,
                    data4: themeColors.purple,
                },
                type: "spline",
            },
            size: {
                height: 280,
            },
            padding: {
                bottom: 20,
            },
            title: {
                text: "Spline Chart",
                position: "top-left",
                padding: {
                    bottom: 20,
                    right: 20,
                    top: 0,
                    left: 20,
                },
            },
            legend: {
                position: "inset",
            },
            bindto: "#billboardjs-chart-8",
        });
    }

    //Bubble Chart
    if ($("#billboardjs-chart-9").length) {
        var chart9 = bb.generate({
            data: {
                columns: [
                    ["data1", 30, 190, 200, 110, 150, 160, 50, 80, 55, 220],
                    ["data2", 130, 100, 10, 143, 80, 50, 200, 123, 185, 98],
                    ["data3", 160, 153, 85, 80, 250, 120, 5, 84, 99, 175],
                ],
                colors: {
                    data1: themeColors.accent,
                    data2: themeColors.secondary,
                    data3: themeColors.orange,
                    data4: themeColors.purple,
                },
                type: "bubble",
                labels: true,
            },
            bubble: {
                maxR: 50,
            },
            axis: {
                x: {
                    type: "category",
                },
                y: {
                    max: 450,
                },
            },
            size: {
                height: 280,
            },
            padding: {
                bottom: 20,
            },
            title: {
                text: "Bubble Chart",
                position: "top-left",
                padding: {
                    bottom: 20,
                    right: 20,
                    top: 0,
                    left: 20,
                },
            },
            legend: {
                position: "inset",
            },
            bindto: "#billboardjs-chart-9",
        });

        setTimeout(function () {
            chart9.load({
                columns: [["data1", 100, 50, 150, 200, 100, 350, 58, 210, 80, 126]],
            });
        }, 1000);

        setTimeout(function () {
            chart9.load({
                columns: [["data2", 305, 350, 55, 25, 335, 29, 258, 310, 180, 226]],
            });
        }, 2000);

        setTimeout(function () {
            chart9.load({
                columns: [["data3", 223, 121, 259, 247, 53, 159, 95, 111, 307, 337]],
            });
        }, 3000);
    }

    //Scatter plot
    if ($("#billboardjs-chart-10").length) {
        var chart10 = bb.generate({
            data: {
                xs: {
                    setosa: "setosa_x",
                    versicolor: "versicolor_x",
                },
                columns: [
                    [
                        "setosa_x",
                        3.5,
                        3,
                        3.2,
                        3.1,
                        3.6,
                        3.9,
                        3.4,
                        3.4,
                        2.9,
                        3.1,
                        3.7,
                        3.4,
                        3,
                        3,
                        4,
                        4.4,
                        3.9,
                        3.5,
                        3.8,
                        3.8,
                        3.4,
                        3.7,
                        3.6,
                        3.3,
                        3.4,
                        3,
                        3.4,
                        3.5,
                        3.4,
                        3.2,
                        3.1,
                        3.4,
                        4.1,
                        4.2,
                        3.1,
                        3.2,
                        3.5,
                        3.6,
                        3,
                        3.4,
                        3.5,
                        2.3,
                        3.2,
                        3.5,
                        3.8,
                        3,
                        3.8,
                        3.2,
                        3.7,
                        3.3,
                    ],
                    [
                        "versicolor_x",
                        3.2,
                        3.2,
                        3.1,
                        2.3,
                        2.8,
                        2.8,
                        3.3,
                        2.4,
                        2.9,
                        2.7,
                        2,
                        3,
                        2.2,
                        2.9,
                        2.9,
                        3.1,
                        3,
                        2.7,
                        2.2,
                        2.5,
                        3.2,
                        2.8,
                        2.5,
                        2.8,
                        2.9,
                        3,
                        2.8,
                        3,
                        2.9,
                        2.6,
                        2.4,
                        2.4,
                        2.7,
                        2.7,
                        3,
                        3.4,
                        3.1,
                        2.3,
                        3,
                        2.5,
                        2.6,
                        3,
                        2.6,
                        2.3,
                        2.7,
                        3,
                        2.9,
                        2.9,
                        2.5,
                        2.8,
                    ],
                    [
                        "setosa",
                        0.2,
                        0.2,
                        0.2,
                        0.2,
                        0.2,
                        0.4,
                        0.3,
                        0.2,
                        0.2,
                        0.1,
                        0.2,
                        0.2,
                        0.1,
                        0.1,
                        0.2,
                        0.4,
                        0.4,
                        0.3,
                        0.3,
                        0.3,
                        0.2,
                        0.4,
                        0.2,
                        0.5,
                        0.2,
                        0.2,
                        0.4,
                        0.2,
                        0.2,
                        0.2,
                        0.2,
                        0.4,
                        0.1,
                        0.2,
                        0.2,
                        0.2,
                        0.2,
                        0.1,
                        0.2,
                        0.2,
                        0.3,
                        0.3,
                        0.2,
                        0.6,
                        0.4,
                        0.3,
                        0.2,
                        0.2,
                        0.2,
                        0.2,
                    ],
                    [
                        "versicolor",
                        1.4,
                        1.5,
                        1.5,
                        1.3,
                        1.5,
                        1.3,
                        1.6,
                        1,
                        1.3,
                        1.4,
                        1,
                        1.5,
                        1,
                        1.4,
                        1.3,
                        1.4,
                        1.5,
                        1,
                        1.5,
                        1.1,
                        1.8,
                        1.3,
                        1.5,
                        1.2,
                        1.3,
                        1.4,
                        1.4,
                        1.7,
                        1.5,
                        1,
                        1.1,
                        1,
                        1.2,
                        1.6,
                        1.5,
                        1.6,
                        1.5,
                        1.3,
                        1.3,
                        1.3,
                        1.2,
                        1.4,
                        1.2,
                        1,
                        1.3,
                        1.2,
                        1.3,
                        1.3,
                        1.1,
                        1.3,
                    ],
                ],
                colors: {
                    setosa_x: themeColors.accent,
                    versicolor_x: themeColors.secondary,
                    setosa: themeColors.orange,
                    versicolor: themeColors.purple,
                    virginica_x: themeColors.info,
                    virginica: themeColors.success,
                },
                type: "scatter",
            },
            axis: {
                x: {
                    //label: "Sepal.Width",
                    tick: {
                        fit: false,
                    },
                },
                y: {
                    //label: "Petal.Width"
                },
            },
            size: {
                height: 280,
            },
            padding: {
                bottom: 20,
            },
            title: {
                text: "Scatter Plot",
                position: "top-left",
                padding: {
                    bottom: 20,
                    right: 20,
                    top: 0,
                    left: 20,
                },
            },
            legend: {
                position: "inset",
            },
            bindto: "#billboardjs-chart-10",
        });

        setTimeout(function () {
            chart10.load({
                xs: {
                    virginica: "virginica_x",
                },
                columns: [
                    [
                        "virginica_x",
                        3.3,
                        2.7,
                        3.0,
                        2.9,
                        3.0,
                        3.0,
                        2.5,
                        2.9,
                        2.5,
                        3.6,
                        3.2,
                        2.7,
                        3.0,
                        2.5,
                        2.8,
                        3.2,
                        3.0,
                        3.8,
                        2.6,
                        2.2,
                        3.2,
                        2.8,
                        2.8,
                        2.7,
                        3.3,
                        3.2,
                        2.8,
                        3.0,
                        2.8,
                        3.0,
                        2.8,
                        3.8,
                        2.8,
                        2.8,
                        2.6,
                        3.0,
                        3.4,
                        3.1,
                        3.0,
                        3.1,
                        3.1,
                        3.1,
                        2.7,
                        3.2,
                        3.3,
                        3.0,
                        2.5,
                        3.0,
                        3.4,
                        3.0,
                    ],
                    [
                        "virginica",
                        2.5,
                        1.9,
                        2.1,
                        1.8,
                        2.2,
                        2.1,
                        1.7,
                        1.8,
                        1.8,
                        2.5,
                        2.0,
                        1.9,
                        2.1,
                        2.0,
                        2.4,
                        2.3,
                        1.8,
                        2.2,
                        2.3,
                        1.5,
                        2.3,
                        2.0,
                        2.0,
                        1.8,
                        2.1,
                        1.8,
                        1.8,
                        1.8,
                        2.1,
                        1.6,
                        1.9,
                        2.0,
                        2.2,
                        1.5,
                        1.4,
                        2.3,
                        2.4,
                        1.8,
                        1.8,
                        2.1,
                        2.4,
                        2.3,
                        1.9,
                        2.3,
                        2.5,
                        2.3,
                        1.9,
                        2.0,
                        2.3,
                        1.8,
                    ],
                ],
            });
        }, 1000);

        setTimeout(function () {
            chart10.unload({
                ids: "setosa",
            });
        }, 2000);

        setTimeout(function () {
            chart10.load({
                columns: [
                    [
                        "virginica",
                        0.2,
                        0.2,
                        0.2,
                        0.2,
                        0.2,
                        0.4,
                        0.3,
                        0.2,
                        0.2,
                        0.1,
                        0.2,
                        0.2,
                        0.1,
                        0.1,
                        0.2,
                        0.4,
                        0.4,
                        0.3,
                        0.3,
                        0.3,
                        0.2,
                        0.4,
                        0.2,
                        0.5,
                        0.2,
                        0.2,
                        0.4,
                        0.2,
                        0.2,
                        0.2,
                        0.2,
                        0.4,
                        0.1,
                        0.2,
                        0.2,
                        0.2,
                        0.2,
                        0.1,
                        0.2,
                        0.2,
                        0.3,
                        0.3,
                        0.2,
                        0.6,
                        0.4,
                        0.3,
                        0.2,
                        0.2,
                        0.2,
                        0.2,
                    ],
                ],
            });
        }, 3000);
    }

    //Stacked Bar Chart
    if ($("#billboardjs-chart-11").length) {
        var chart11 = bb.generate({
            data: {
                columns: [
                    ["data1", 30],
                    ["data2", 120],
                ],
                colors: {
                    data1: themeColors.accent,
                    data2: themeColors.secondary,
                    data3: themeColors.orange,
                    data4: themeColors.purple,
                    setosa: themeColors.orange,
                    versicolor: themeColors.purple,
                    virginica: themeColors.success,
                },
                type: "pie",
                onclick: function (d, i) {
                    console.log("onclick", d, i);
                },
                onover: function (d, i) {
                    console.log("onover", d, i);
                },
                onout: function (d, i) {
                    console.log("onout", d, i);
                },
            },
            size: {
                height: 280,
            },
            padding: {
                bottom: 20,
            },
            title: {
                text: "Pie Chart",
                position: "top-left",
                padding: {
                    bottom: 20,
                    right: 20,
                    top: 0,
                    left: 20,
                },
            },
            legend: {
                position: "inset",
            },
            bindto: "#billboardjs-chart-11",
        });

        setTimeout(function () {
            chart11.load({
                columns: [
                    [
                        "setosa",
                        0.2,
                        0.2,
                        0.2,
                        0.2,
                        0.2,
                        0.4,
                        0.3,
                        0.2,
                        0.2,
                        0.1,
                        0.2,
                        0.2,
                        0.1,
                        0.1,
                        0.2,
                        0.4,
                        0.4,
                        0.3,
                        0.3,
                        0.3,
                        0.2,
                        0.4,
                        0.2,
                        0.5,
                        0.2,
                        0.2,
                        0.4,
                        0.2,
                        0.2,
                        0.2,
                        0.2,
                        0.4,
                        0.1,
                        0.2,
                        0.2,
                        0.2,
                        0.2,
                        0.1,
                        0.2,
                        0.2,
                        0.3,
                        0.3,
                        0.2,
                        0.6,
                        0.4,
                        0.3,
                        0.2,
                        0.2,
                        0.2,
                        0.2,
                    ],
                    [
                        "versicolor",
                        1.4,
                        1.5,
                        1.5,
                        1.3,
                        1.5,
                        1.3,
                        1.6,
                        1.0,
                        1.3,
                        1.4,
                        1.0,
                        1.5,
                        1.0,
                        1.4,
                        1.3,
                        1.4,
                        1.5,
                        1.0,
                        1.5,
                        1.1,
                        1.8,
                        1.3,
                        1.5,
                        1.2,
                        1.3,
                        1.4,
                        1.4,
                        1.7,
                        1.5,
                        1.0,
                        1.1,
                        1.0,
                        1.2,
                        1.6,
                        1.5,
                        1.6,
                        1.5,
                        1.3,
                        1.3,
                        1.3,
                        1.2,
                        1.4,
                        1.2,
                        1.0,
                        1.3,
                        1.2,
                        1.3,
                        1.3,
                        1.1,
                        1.3,
                    ],
                    [
                        "virginica",
                        2.5,
                        1.9,
                        2.1,
                        1.8,
                        2.2,
                        2.1,
                        1.7,
                        1.8,
                        1.8,
                        2.5,
                        2.0,
                        1.9,
                        2.1,
                        2.0,
                        2.4,
                        2.3,
                        1.8,
                        2.2,
                        2.3,
                        1.5,
                        2.3,
                        2.0,
                        2.0,
                        1.8,
                        2.1,
                        1.8,
                        1.8,
                        1.8,
                        2.1,
                        1.6,
                        1.9,
                        2.0,
                        2.2,
                        1.5,
                        1.4,
                        2.3,
                        2.4,
                        1.8,
                        1.8,
                        2.1,
                        2.4,
                        2.3,
                        1.9,
                        2.3,
                        2.5,
                        2.3,
                        1.9,
                        2.0,
                        2.3,
                        1.8,
                    ],
                ],
            });
        }, 1500);

        setTimeout(function () {
            chart11.unload({ids: "data1"});
            chart11.unload({ids: "data2"});
        }, 2500);
    }

    //Stacked Bar Chart
    if ($("#billboardjs-chart-12").length) {
        var chart12 = bb.generate({
            data: {
                columns: [
                    ["data1", 30],
                    ["data2", 120],
                ],
                colors: {
                    data1: themeColors.accent,
                    data2: themeColors.secondary,
                    data3: themeColors.orange,
                    data4: themeColors.purple,
                    setosa: themeColors.orange,
                    versicolor: themeColors.purple,
                    virginica: themeColors.success,
                },
                type: "donut",
                onclick: function (d, i) {
                    console.log("onclick", d, i);
                },
                onover: function (d, i) {
                    console.log("onover", d, i);
                },
                onout: function (d, i) {
                    console.log("onout", d, i);
                },
            },
            donut: {
                title: "Inner Title",
            },
            size: {
                height: 280,
            },
            padding: {
                bottom: 20,
            },
            title: {
                text: "Donut Chart",
                position: "top-left",
                padding: {
                    bottom: 20,
                    right: 20,
                    top: 0,
                    left: 20,
                },
            },
            legend: {
                position: "inset",
            },
            bindto: "#billboardjs-chart-12",
        });

        setTimeout(function () {
            chart12.load({
                columns: [
                    [
                        "setosa",
                        0.2,
                        0.2,
                        0.2,
                        0.2,
                        0.2,
                        0.4,
                        0.3,
                        0.2,
                        0.2,
                        0.1,
                        0.2,
                        0.2,
                        0.1,
                        0.1,
                        0.2,
                        0.4,
                        0.4,
                        0.3,
                        0.3,
                        0.3,
                        0.2,
                        0.4,
                        0.2,
                        0.5,
                        0.2,
                        0.2,
                        0.4,
                        0.2,
                        0.2,
                        0.2,
                        0.2,
                        0.4,
                        0.1,
                        0.2,
                        0.2,
                        0.2,
                        0.2,
                        0.1,
                        0.2,
                        0.2,
                        0.3,
                        0.3,
                        0.2,
                        0.6,
                        0.4,
                        0.3,
                        0.2,
                        0.2,
                        0.2,
                        0.2,
                    ],
                    [
                        "versicolor",
                        1.4,
                        1.5,
                        1.5,
                        1.3,
                        1.5,
                        1.3,
                        1.6,
                        1.0,
                        1.3,
                        1.4,
                        1.0,
                        1.5,
                        1.0,
                        1.4,
                        1.3,
                        1.4,
                        1.5,
                        1.0,
                        1.5,
                        1.1,
                        1.8,
                        1.3,
                        1.5,
                        1.2,
                        1.3,
                        1.4,
                        1.4,
                        1.7,
                        1.5,
                        1.0,
                        1.1,
                        1.0,
                        1.2,
                        1.6,
                        1.5,
                        1.6,
                        1.5,
                        1.3,
                        1.3,
                        1.3,
                        1.2,
                        1.4,
                        1.2,
                        1.0,
                        1.3,
                        1.2,
                        1.3,
                        1.3,
                        1.1,
                        1.3,
                    ],
                    [
                        "virginica",
                        2.5,
                        1.9,
                        2.1,
                        1.8,
                        2.2,
                        2.1,
                        1.7,
                        1.8,
                        1.8,
                        2.5,
                        2.0,
                        1.9,
                        2.1,
                        2.0,
                        2.4,
                        2.3,
                        1.8,
                        2.2,
                        2.3,
                        1.5,
                        2.3,
                        2.0,
                        2.0,
                        1.8,
                        2.1,
                        1.8,
                        1.8,
                        1.8,
                        2.1,
                        1.6,
                        1.9,
                        2.0,
                        2.2,
                        1.5,
                        1.4,
                        2.3,
                        2.4,
                        1.8,
                        1.8,
                        2.1,
                        2.4,
                        2.3,
                        1.9,
                        2.3,
                        2.5,
                        2.3,
                        1.9,
                        2.0,
                        2.3,
                        1.8,
                    ],
                ],
            });
        }, 1500);

        setTimeout(function () {
            chart12.unload({
                ids: "data1",
            });
            chart12.unload({
                ids: "data2",
            });
        }, 2500);
    }

    //Gauge Chart
    if ($("#billboardjs-chart-13").length) {
        var chart13 = bb.generate({
            data: {
                columns: [["data", 91.4]],
                type: "gauge",
                onclick: function (d, i) {
                    console.log("onclick", d, i);
                },
                onover: function (d, i) {
                    console.log("onover", d, i);
                },
                onout: function (d, i) {
                    console.log("onout", d, i);
                },
            },
            gauge: {},
            color: {
                pattern: [
                    themeColors.accent,
                    themeColors.secondary,
                    themeColors.orange,
                    themeColors.purple,
                ],
                threshold: {
                    values: [30, 60, 90, 100],
                },
            },
            size: {
                height: 280,
            },
            padding: {
                bottom: 20,
            },
            title: {
                text: "Gauge Chart",
                position: "top-left",
                padding: {
                    bottom: 20,
                    right: 20,
                    top: 0,
                    left: 20,
                },
            },
            legend: {
                position: "inset",
            },
            bindto: "#billboardjs-chart-13",
        });

        setTimeout(function () {
            chart13.load({
                columns: [["data", 10]],
            });
        }, 1000);

        setTimeout(function () {
            chart13.load({
                columns: [["data", 50]],
            });
        }, 2000);

        setTimeout(function () {
            chart13.load({
                columns: [["data", 70]],
            });
        }, 3000);

        setTimeout(function () {
            chart13.load({
                columns: [["data", 0]],
            });
        }, 4000);

        setTimeout(function () {
            chart13.load({
                columns: [["data", 100]],
            });
        }, 5000);
    }

    //Radar Chart
    if ($("#billboardjs-chart-14").length) {
        var chart14 = bb.generate({
            data: {
                x: "x",
                columns: [
                    ["x", "Data A", "Data B", "Data C", "Data D", "Data E"],
                    ["data1", 330, 350, 200, 380, 150],
                    ["data2", 130, 100, 30, 200, 80],
                    ["data3", 230, 153, 85, 300, 250],
                ],
                colors: {
                    data1: themeColors.accent,
                    data2: themeColors.secondary,
                    data3: themeColors.orange,
                    data4: themeColors.purple,
                },
                type: "radar",
                labels: true,
            },
            radar: {
                axis: {
                    max: 400,
                },
                level: {
                    depth: 4,
                },
                direction: {
                    clockwise: true,
                },
            },
            size: {
                height: 280,
            },
            padding: {
                bottom: 20,
            },
            title: {
                text: "Radar Chart",
                position: "top-left",
                padding: {
                    bottom: 20,
                    right: 20,
                    top: 0,
                    left: 20,
                },
            },
            legend: {
                position: "inset",
            },
            bindto: "#billboardjs-chart-14",
        });
    }
});
