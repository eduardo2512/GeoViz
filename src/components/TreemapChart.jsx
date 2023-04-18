import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import TreemapChartService from "../services/TreemapChartService";

function TreemapChart({ data, categoria, detalhes, valor, calculoValor }) {
  const svgRef = useRef();
  const [svgCreated, setSvgCreated] = useState(false);

  useEffect(() => {
    const margin = { top: 10, right: 10, bottom: 10, left: 10 },
      width = 600 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    let svg;

    if (!svgCreated) {
      svg = d3
        .select(svgRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g");
      setSvgCreated(true);
    } else {
      svg = d3.select(svgRef.current).select("svg").select("g");
      svg.selectAll("*").remove();
    }

    // read json data

    const dados = TreemapChartService.obterJsonTreeMap(
      data,
      categoria,
      detalhes,
      valor,
      calculoValor
    );

    // Give the data to this cluster layout:
    const root = d3.hierarchy(dados).sum(function (d) {
      return d.value;
    }); // Here the size of each leave is given in the 'value' field in input data

    // Then d3.treemap computes the position of each element of the hierarchy
    d3.treemap().size([width, height]).padding(2)(root);

    // use this information to add rectangles:
    svg
      .selectAll("rect")
      .data(root.leaves())
      .join("rect")
      .attr("x", function (d) {
        return d.x0;
      })
      .attr("y", function (d) {
        return d.y0;
      })
      .attr("width", function (d) {
        return d.x1 - d.x0;
      })
      .attr("height", function (d) {
        return d.y1 - d.y0;
      })
      .style("stroke", "black")
      .style("fill", "slateblue")
      .on("click", function (d) {});

    // and to add the text labels
    svg
      .selectAll("text")
      .data(root.leaves())
      .join("text")
      .attr("x", function (d) {
        return d.x0 + 5;
      }) // +10 to adjust position (more right)
      .attr("y", function (d) {
        return d.y0 + 20;
      }) // +20 to adjust position (lower)
      .text(function (d) {
        return d.data.name;
      })
      .attr("font-size", "15px")
      .attr("fill", "white");

    return () => {
      svg.selectAll("*").remove();
    };
  }, [data, detalhes, valor, categoria]);
  return <div className="Treemap" ref={svgRef}></div>;
}

export default TreemapChart;
