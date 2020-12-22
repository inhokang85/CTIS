function graph_01(graphData, obj, st){
	var w= 0;
	if(st == "st1"){
		w = 135, h = 135;
	}
 	if(st == "st2"){
		w = 129, h = 129;
	}
 
	var colorData = ["#5161e7", "#88a9fd", "#abcdff", "#9e94f9", "#88a9fd"];
	var pie = d3.pie();
	var arc = d3.arc().innerRadius(15).outerRadius(w/2);

	var svg = d3.select(".one-graph#"+obj)
		.append("svg")
		.attr("width", w)
		.attr("height", h)
		.attr("id", "graphWrap");

	var g = svg.selectAll(".one-graph#"+obj+" .pie")
		.data(pie(graphData))
		.enter()
		//.append("g") insert 역순으로 변경
        .insert('g', ":first-child")
		.attr("class", "pie_1")
		.attr("transform","translate("+w/2+","+h/2+")");

	g.append("path")
		.style("fill", function(d, i) {
			return colorData[i];
		})
		.transition()
		.duration(500)
		.delay(function(d, i) {
			return i * 100;
		})
		.attrTween("d", function(d, i) {
			var interpolate = d3.interpolate(
				{startAngle : d.startAngle, endAngle : d.startAngle},
				{startAngle : d.startAngle, endAngle : d.endAngle}
			);
			return function(t){
				return arc(interpolate(t));
			}
		});

	g.append("text")
		.attr("transform", function(d) {  return "translate("+(arc.centroid(d)[0]-10)+", "+arc.centroid(d)[1]+")"; })
		//.attr("transform",function(d) {alert(arc.centroid(d)[1]); "translate("+arc.centroid(d)[0]+","+arc.centroid(d)[1]+")"})
 		//.attr('x', arc.centroid(d)[0])
		//.attr('y', arc.centroid(d)[1])
 		.attr("class", "graph_txt_1")
		.attr('dy', '0.33em')
		.style("font-size", "12px")
		.style("color", "#ffffff")
	   .text(function(d, i) {
		   var colObj = d;
		   var col = JSON.stringify(colObj.value)
		   if(col != 0){
				//return graphData[i] + "%";
				if(obj=='multi_grp'){
					return graphData[i] + "명";
				}  else {
					return graphData[i] + "%";
				}
		   }
		})
        .attr("class", function(d, i) {
            if (graphData[i]<=5) {return 'sm';}
        });

}