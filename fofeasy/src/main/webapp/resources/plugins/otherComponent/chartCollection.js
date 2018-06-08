//小圆点图
function smalldotChart(resp) {
	var title = "<tr>";
	var left_title = "";
	var tbl = "";
	if (resp.categories.length < 7) {
		for (var i = 0; i < resp.categories.length; i++) {
			title += "<th><span class='manywords70'>" + resp.categories[i] + "</span></th>";
			left_title += "<div>" + resp.categories[i] + "</div>";
			tbl += "<tr>"
			for (var j = 0; j < resp.series[i].data.length; j++) {
				if (j >= i) {
					if (j == i) {
						tbl+="<td><div class='radius_blue' data-toggle='tooltip' data-placement='right' title='"+(resp.categories[i])+'与'+(resp.categories[j])+
							'的相关性系数为：1.00'+"' style='width:40px;height:40px;'></div></td>"	
					} else {
						if (resp.series[i].data[j] == "-") {
							tbl += "<td>" + resp.series[i].data[j] + "</td>"
						} else {
							if ((resp.series[i].data[j]) >= 0) {
								if ((resp.series[i].data[j]) < 0.5) {
									/*tbl += "<td><div class='radius_blue3' title='" + (resp.series[i].data[j]).toFixed(2) + "' style='width:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;height:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;'></div></td>"*/
									tbl += "<td><div class='radius_blue3' data-toggle='tooltip' data-placement='right' title='"+(resp.categories[i])+'与'+(resp.categories[j])+
									'的相关性系数为：'+(resp.series[i].data[j]).toFixed(2)+"' style='width:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;height:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;'></div></td>"								
								} else if ((resp.series[i].data[j]) < 0.8) {
									/*tbl += "<td><div class='radius_blue2' title='" + (resp.series[i].data[j]).toFixed(2) + "' style='width:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;height:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;'></div></td>"*/
									tbl += "<td><div class='radius_blue2'  data-toggle='tooltip' data-placement='right'  title='"+(resp.categories[i])+'与'+(resp.categories[j])+
									'的相关性系数为：'+(resp.series[i].data[j]).toFixed(2)+"' style='width:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;height:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;'></div></td>"						
								} else {
									/*tbl += "<td><div class='radius_blue' title='" + (resp.series[i].data[j]).toFixed(2) + "' style='width:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;height:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;'></div></td>"*/
									tbl += "<td><div class='radius_blue' data-toggle='tooltip' data-placement='right' title='"+(resp.categories[i])+'与'+(resp.categories[j])+
									'的相关性系数为：'+(resp.series[i].data[j]).toFixed(2)+"' style='width:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;height:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;'></div></td>"
									
								}
							} else {
								if (Math.abs(resp.series[i].data[j]) < 0.5) {
									/*tbl += "<td><div class='radius_red3' title='" + (resp.series[i].data[j]).toFixed(2) + "' style='width:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;height:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;'></div></td>"*/
									tbl += "<td><div class='radius_red3' data-toggle='tooltip' data-placement='right' title='"+(resp.categories[i])+'与'+(resp.categories[j])+
									'的相关性系数为：'+(resp.series[i].data[j]).toFixed(2)+"' style='width:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;height:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;'></div></td>"		
								} else if (Math.abs(resp.series[i].data[j]) < 0.8) {
									/*tbl += "<td><div class='radius_red2' title='" + (resp.series[i].data[j]).toFixed(2) + "' style='width:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;height:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;'></div></td>"*/
									tbl+="<td><div class='radius_red2' data-toggle='tooltip' data-placement='right' title='"+(resp.categories[i])+'与'+(resp.categories[j])+
									'的相关性系数为：'+(resp.series[i].data[j]).toFixed(2)+"' style='width:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;height:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;'></div></td>"								
								} else {
									/*tbl += "<td><div class='radius_red' title='" + (resp.series[i].data[j]).toFixed(2) + "' style='width:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;height:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;'></div></td>"*/
									tbl+="<td><div class='radius_red' data-toggle='tooltip' data-placement='right' title='"+(resp.categories[i])+'与'+(resp.categories[j])+
									'的相关性系数为：'+(resp.series[i].data[j]).toFixed(2)+"' style='width:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;height:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;'></div></td>"
									
								}
							}
						}
					}
				} else {
					if (resp.series[i].data[j] == "-") {
						tbl += "<td>" + resp.series[i].data[j] + "</td>"
					} else {
						tbl += "<td>" + (resp.series[i].data[j]).toFixed(2) + "</td>"
					}
				}
			}
			tbl += "</tr>"
		}
		title += "</tr>";
	} else {
		for (var i = 0; i < 7; i++) {
			title += "<th><span class='manywords70' >" + resp.categories[i] + "</span></th>";
			left_title += "<div>" + resp.categories[i] + "</div>";
			tbl += "<tr>"
			for (var j = 0; j < 7; j++) {
				if (j >= i) {
					if (j == i) {
						tbl+="<td><div class='radius_blue' data-toggle='tooltip' data-placement='right' title='"+(resp.categories[i])+'与'+(resp.categories[j])+
							'的相关性系数为：1.00'+"' style='width:40px;height:40px;'></div></td>"	
					} else {
						if (resp.series[i].data[j] == "-") {
							tbl += "<td>" + resp.series[i].data[j] + "</td>"
						} else {
							if ((resp.series[i].data[j]) >= 0) {
								if ((resp.series[i].data[j]) < 0.5) {
									/*tbl += "<td><div class='radius_blue3' title='" + (resp.series[i].data[j]).toFixed(2) + "' style='width:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;height:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;'></div></td>"*/
									tbl += "<td><div class='radius_blue3' data-toggle='tooltip' data-placement='right' title='"+(resp.categories[i])+'与'+(resp.categories[j])+
									'的相关性系数为：'+(resp.series[i].data[j]).toFixed(2)+"' style='width:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;height:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;'></div></td>"								
								} else if ((resp.series[i].data[j]) < 0.8) {
									/*tbl += "<td><div class='radius_blue2' title='" + (resp.series[i].data[j]).toFixed(2) + "' style='width:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;height:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;'></div></td>"*/
									tbl += "<td><div class='radius_blue2'  data-toggle='tooltip' data-placement='right'  title='"+(resp.categories[i])+'与'+(resp.categories[j])+
									'的相关性系数为：'+(resp.series[i].data[j]).toFixed(2)+"' style='width:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;height:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;'></div></td>"						
								} else {
									/*tbl += "<td><div class='radius_blue' title='" + (resp.series[i].data[j]).toFixed(2) + "' style='width:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;height:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;'></div></td>"*/
									tbl += "<td><div class='radius_blue' data-toggle='tooltip' data-placement='right' title='"+(resp.categories[i])+'与'+(resp.categories[j])+
									'的相关性系数为：'+(resp.series[i].data[j]).toFixed(2)+"' style='width:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;height:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;'></div></td>"
									
								}
							} else {
								if (Math.abs(resp.series[i].data[j]) < 0.5) {
									/*tbl += "<td><div class='radius_red3' title='" + (resp.series[i].data[j]).toFixed(2) + "' style='width:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;height:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;'></div></td>"*/
									tbl += "<td><div class='radius_red3' data-toggle='tooltip' data-placement='right' title='"+(resp.categories[i])+'与'+(resp.categories[j])+
									'的相关性系数为：'+(resp.series[i].data[j]).toFixed(2)+"' style='width:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;height:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;'></div></td>"		
								} else if (Math.abs(resp.series[i].data[j]) < 0.8) {
									/*tbl += "<td><div class='radius_red2' title='" + (resp.series[i].data[j]).toFixed(2) + "' style='width:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;height:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;'></div></td>"*/
									tbl+="<td><div class='radius_red2' data-toggle='tooltip' data-placement='right' title='"+(resp.categories[i])+'与'+(resp.categories[j])+
									'的相关性系数为：'+(resp.series[i].data[j]).toFixed(2)+"' style='width:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;height:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;'></div></td>"								
								} else {
									/*tbl += "<td><div class='radius_red' title='" + (resp.series[i].data[j]).toFixed(2) + "' style='width:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;height:" + 20 * ((Math.abs(resp.series[i].data[j].toFixed(2))) + 1) + "px;'></div></td>"*/
									tbl+="<td><div class='radius_red' data-toggle='tooltip' data-placement='right' title='"+(resp.categories[i])+'与'+(resp.categories[j])+
									'的相关性系数为：'+(resp.series[i].data[j]).toFixed(2)+"' style='width:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;height:"+20*((Math.abs(resp.series[i].data[j].toFixed(2)))+1)+"px;'></div></td>"
									
								}
							}
						}
					}
				} else {
					if (resp.series[i].data[j] == "-") {
						tbl += "<td>" + resp.series[i].data[j] + "</td>"
					} else {
						tbl += "<td>" + (resp.series[i].data[j]).toFixed(2) + "</td>"
					}
				}
			}
			tbl += "</tr>"
		}
		title += "</tr>";
	}
	title += "</tr>";
	var tblData = {
		"left_title" : left_title,
		"title" : title,
		"tbl" : tbl
	}
	return tblData
}