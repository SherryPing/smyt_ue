//基本图形
var util = require('util');
function initchart(dom, resp, data) {
	dom.highcharts({
		chart : {
			type : data.chart_type,
			zoomType: data.zoomType,
		},
        colors : data.color || ['#7bbdf5','#FFA1CC','#2FB9A1','#eba91c','#7154dd','#f8354f','#1f8aee'],
		title : {
			text : null,
		},
		xAxis : {
			type : data.xType||"categories",
			labels : {
				enabled : true
			},
			tickmarkPlacement : data.x_tickmarkPlacement || 'between',
			categories : resp.categories,
			dateTimeLabelFormats: data.xDateTimeLabelFormats||{
                day: '%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
		},
		yAxis : {
			labels : {
				enabled : true, //y轴可见
				formatter : function() { //根据传入进行y轴格式化区分
					if (data.reservations == "percent") {
						return (this.value * 100).toFixed(0) + "%";
					}else if (data.reservations == "percent2") {
                        return (this.value * 100).toFixed(2) + "%";
                    } else {
						return this.value.toLocaleString();
					}
				},
			},
			max : data.max || null,
			min : data.min || null,
			title : {
				text : data.yTitle||" ",
			}
		},
		tooltip : {
			pointFormatter : function() {
				var value = null;
				var text="";
				if (data.reservations == "percent"||data.reservations == "percent2") {
					value = util.fmtRatio(this.y);
				} else if (data.reservations == "fixed2") {
					value = util.fmtFixed(this.y, 2);
				} else if (data.reservations == "fixed21") {
					value = util.fmtFixed(this.y, 2);
					text="（"+data.unit+"）";
				} else if (data.reservations == "fixed4") {
					value = util.fmtFixed(this.y, 4);
				} else {
					value = this.value;
				}
				return '<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b>' + value + '</b>'+text+'<br/>';
			},
			shared : true
		},
		legend : {
			enabled : data.legend.enabled || false, //是否显示图例 false
			layout : data.legend.layout || 'vertical', //布局 horizontal vertical
			align : data.legend.align || 'right', //图表对其方式center right
			verticalAlign : data.legend.verticalAlign || 'middle', //垂直对齐方式 bottom middle
			borderWidth : data.legend.borderWidth || 0,
		},
		plotOptions: {
	        series: {
	            marker : {
	                radius : data.radius||2, //曲线点半径，默认是4
	            },
	        },
	        column : {
				pointWidth : data.columnPointWidth||null,
                maxPointWidth: 30
			}
	    },
		credits : {
			enabled : false //不显示highcharts链接
		},
		exporting : {
			enabled : false //设置导出按钮不可用
		},
		series : resp.series
	})
}

//初始化面积图
function initArea(dom, resp, data) {
	dom.highcharts({
		chart : {
			zoomType : data.zoomType,
			type : data.type||'area'
		},
		colors : data.color || [ '#2765B9', '#2C8CF8', '#FB88B3', '#D72F54', '#9370DB' ],
		title : {
			text : ' '
		},
		xAxis : {
			type : data.xType||"categories",
			categories : resp.date,
            labels : {
            	rotation : data.rotation||0,
            },
			tickmarkPlacement : data.x_tickmarkPlacement || 'on',
			dateTimeLabelFormats : data.xDateTimeLabelFormats||{
				millisecond : '%H:%M:%S.%L',
				second : '%H:%M:%S',
				minute : '%H:%M',
				hour : '%H:%M',
				day : '%Y-%m-%d',
				week : '%Y-%m-%d',
				month : '%Y-%m-%d',
				year : '%Y-%m-%d'
			}
		},
		yAxis : {
			labels : {
				formatter : function() { //根据传入进行y轴格式化区分
					if (data.reservations == "percent"||data.reservations == "percent1") {
						return this.value.toFixed(0) + "%";
					} else if (data.reservations == "percent2") {
						return util.fmtRatio(this.value);
					} else {
						return this.value;
					}
				},
			},
			title : " "
		},
		tooltip : {
			pointFormatter : function() {
				var value = null;
				var text="";
				if (data.reservations == "percent"||data.reservations == "percent2") {
					value = util.fmtRatio(this.y);
				} else if (data.reservations == "fixed2") {
					value = util.fmtFixed(this.y, 2);
				}else if (data.reservations == "thou-fixed2") {
                    value = util.fmtFixed(this.y, 2);
                    text="亿元";
                } else if (data.reservations == "fixed4") {
					value = util.fmtFixed(this.y, 4);
				}  else if (data.reservations == "percent1") {
					value = this.percentage.toFixed(1)+"%";
					text="（"+Math.round(this.y).toLocaleString()+"万元）";					
				} else {
					value = this.value;
				}
				return '<span style="color:black">' + this.series.name + '</span>: <b>' + value + '</b>'+text+ '<br/>';
			},
			dateTimeLabelFormats : data.tDateTimeLabelFormats||{
				millisecond : '%H:%M:%S.%L',
				second : '%H:%M:%S',
				minute : '%H:%M',
				hour : '%H:%M',
				day : '%Y-%m-%d',
				week : '%Y-%m-%d',
				month : '%Y-%m-%d',
				year : '%Y-%m-%d'
			},
			shared : true
		},
		legend : {
			enabled : data.legend.enabled || false, //是否显示图例 false
			layout : data.legend.layout || 'horizontal', //布局 horizontal vertical
			align : data.legend.align || 'center', //图表对其方式center right
			verticalAlign : data.legend.verticalAlign || 'bottom', //垂直对齐方式 bottom middle
			borderWidth : data.legend.borderWidth || 0,
		},
		plotOptions : {
            series : {
				stacking : data.stacking||null,
				lineColor : data.lineColor,
				lineWidth : data.lineWidth||1,
				marker : {
					lineWidth : data.markerLineWidth||0,
					radius : data.markerRadius||4,
				},
                fillColor: data.fillColor||null
			},
		},
		credits : {
			enabled : false //不显示highcharts链接
		},
        exporting : {
            enabled : false //设置导出按钮不可用
        },
		series : resp.series
	});
}

//初始化面积图-带负值提示
function initArea2(dom, resp, data) {
    dom.highcharts({
        chart : {
            zoomType : data.zoomType||'x',
            type : data.type||'area'
        },
        // colors : data.color || color2,
        title : {
            text : ' '
        },
        xAxis : {
            type : data.xType||"categories",
            categories : resp.categories,
            tickmarkPlacement : data.x_tickmarkPlacement || 'on',
            dateTimeLabelFormats : data.xDateTimeLabelFormats||{
                day: '%Y-%m-%d',
                week: '%Y-%m-%d',
                month: '%Y-%m-%d',
                year: '%Y-%m-%d'
            }
        },
        yAxis : {
            labels : {
                formatter : data.y_formatter||function() { //根据传入进行y轴格式化区分
                    if (data.reservations == "percent"||data.reservations == "percent1"||data.reservations == "percent3") {
                        return this.value.toFixed(0) + "%";
                    } else if (data.reservations == "percent2") {
                        return util.fmtRatio(this.value);
                    } else if (data.reservations == "percent4") {
                        return (this.value * 100).toFixed(2) + "%";
                    } else if (data.reservations == "percent5") {
                        return (this.value * 100).toFixed(0) + "%";
                    }else {
                        return this.value;
                    }
                },
            },
            title : " "
        },
        tooltip : {
            pointFormatter : function() {
                var value = null;
                var text="";
                if (data.reservations == "percent"||data.reservations == "percent2"||data.reservations == "percent4"||data.reservations == "percent5") {
                    value = util.fmtRatio(this.y);
                } else if (data.reservations == "fixed") {
                    value = util.fmtFixed(this.y, 0);
                }else if (data.reservations == "fixed2") {
                    value = util.fmtFixed(this.y, 2);
                } else if (data.reservations == "fixed4") {
                    value = util.fmtFixed(this.y, 4);
                } else if (data.reservations == "percent1") {
                    value = this.percentage.toFixed(1)+"%";
                    text="（"+Math.round(this.y).toLocaleString()+"万元）";
                } else if (data.reservations == "percent3") {
                    value = this.percentage.toFixed(2)+"%";
                    text="（"+Math.round(this.y).toLocaleString()+"万元）";
                } else {
                    value = this.value;
                }
                return '<span style="color:black">' + this.series.name + '</span>: <b>' + value + '</b>'+text+ '<br/>';
            },
            formatter:data.formatter,
            dateTimeLabelFormats : data.tDateTimeLabelFormats||{
                millisecond : '%H:%M:%S.%L',
                second : '%H:%M:%S',
                minute : '%H:%M',
                hour : '%H:%M',
                day : '%Y-%m-%d',
                week : '%Y-%m-%d',
                month : '%Y-%m-%d',
                year : '%Y-%m-%d'
            },
            shared : true
        },
        legend : {
            enabled : data.legend.enabled || false, //是否显示图例 false
            layout : data.legend.layout || 'horizontal', //布局 horizontal vertical
            align : data.legend.align || 'center', //图表对其方式center right
            verticalAlign : data.legend.verticalAlign || 'bottom', //垂直对齐方式 bottom middle
            borderWidth : data.legend.borderWidth || 0,
            itemStyle: {
                fontWeight: 'normal',
                color:'#70757b'
            }
        },
        plotOptions : {
            series : {
                stacking : data.stacking||null,
                lineColor : data.lineColor,
                lineWidth : data.lineWidth||2,
                marker : {
                    enabled: false
                },
                fillColor: data.fillColor||null,
                fillOpacity: data.fillOpacity||0,
                turboThreshold:data.turboThreshold||1000,
            },
        },
        exporting : {
            enabled : false //设置导出按钮不可用
        },
        credits : {
            enabled : false //不显示highcharts链接
        },
        series : resp.series
    });
}