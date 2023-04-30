import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import TreemapChartService from "../services/TreemapChartService";

function TreemapChart({ data, categoria, detalhes, valor, calculoValor }) {
  const svgRef = useRef();
  const [svgCreated, setSvgCreated] = useState(false);
  const [tooltipCreated, setTooltipCreated] = useState(false);

  useEffect(() => {
    const margin = { top: 10, right: 10, bottom: 10, left: 10 },
      width = 420 - margin.left - margin.right,
      height = 420 - margin.top - margin.bottom;

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

    let Tooltip;

    if (!tooltipCreated) {
      Tooltip = d3
        .select("#div_template")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style("position", "absolute")
        .style("top", "0")
        .style("left", "0")
        .style("z-index", "2");
      setTooltipCreated(true);
    } else {
      Tooltip = d3.select("#div_template").select("div");
      Tooltip.selectAll("*").remove();
    }

    const mouseover = function (d) {
      Tooltip.style("opacity", 1);
      d3.select(this).style("stroke", "none").style("opacity", 0.8);
    };
    const mousemove = function (event, d) {
      Tooltip.html("Categoria: " + d.data.name + "<br> Valor: " + d.data.value)
        .style("left", d3.pointer(event)[0] + 70 + "px")
        .style("top", d3.pointer(event)[1] + "px");
    };
    const mouseleave = function (d) {
      Tooltip.style("opacity", 0);
      d3.select(this).style("stroke", "black").style("opacity", 1);
    };

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
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);

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
  }, [data, detalhes, valor, categoria, calculoValor]);
  return (
    <div className="Treemap" ref={svgRef} id="div_template" style={{ position: "relative" }}></div>
  );
}

export default TreemapChart;
