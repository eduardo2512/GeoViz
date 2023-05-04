import "./TreemapChart.css";
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

    const root = d3
      .hierarchy(dados)
      .sum(function (d) {
        return d.value;
      })
      .sort(function (a, b) {
        return b.value - a.value;
      });

    d3.treemap().size([width, height]).paddingTop(3).paddingRight(3).paddingInner(2)(root);

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
      const className = d3.select(this).select("div").node()?.className;
      Tooltip.style("opacity", 1);
      d3.selectAll("." + className)
        .style("stroke", "none")
        .style("opacity", 0.8);
    };
    const mousemove = function (event, d) {
      !d.parent.data.name
        ? Tooltip.html("Categoria: " + d.data.name + "<br> Valor: " + d.data.value)
            .style("left", d3.pointer(event)[0] + 15 + "px")
            .style("top", d3.pointer(event)[1] + "px")
        : Tooltip.html(
            "Categoria: " +
              d.parent.data.name +
              "<br> Detalhes: " +
              d.data.name +
              "<br> Valor: " +
              d.data.value
          )
            .style("left", d3.pointer(event)[0] + 15 + "px")
            .style("top", d3.pointer(event)[1] + "px");
    };
    const mouseleave = function (d) {
      const className = d3.select(this).select("div").node()?.className;
      Tooltip.style("opacity", 0);
      d3.selectAll("." + className)
        .style("stroke", "black")
        .style("opacity", 1);
    };

    const filterTreemap = function (event, d) {
      //Funçao que filtra no mapa
      console.log(d);
      console.log(d.parent.data.name);
      console.log(d.data.name);
      console.log(d.data.value);
    };

    const color = d3.scaleOrdinal(d3.schemeCategory10);

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
      .attr("class", function (d) {
        const className = d.parent.data.name + d.data.name + d.data.value;
        return className.replace(" ", "");
      })
      .style("stroke", "black")
      .style("fill", function (d) {
        return color(d.parent.data.name);
      })
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);

    svg
      .selectAll("vals")
      .data(root.leaves())
      .join("foreignObject")
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
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .on("click", filterTreemap)
      .append("xhtml:div")
      .attr("class", function (d) {
        const className = d.parent.data.name + d.data.name + d.data.value;
        return className.replace(" ", "");
      })
      .each(function (d) {
        if (d.y1 - d.y0 > 20 && d.x1 - d.x0 > 20) {
          d3.select(this)
            .append("xhtml:div")
            .attr("class", "detalhes")
            .append("xhtml:span")
            .text(function (d) {
              return d.data.name;
            });
        }
        if (d.parent.data.name && d.y1 - d.y0 > 40 && d.x1 - d.x0 > 20) {
          d3.select(this)
            .append("xhtml:div")
            .attr("class", "categoria")
            .append("xhtml:span")
            .attr("class", "bottom-span")

            .text(function (d) {
              return d.parent.data.name;
            });
        }
      });

    return () => {
      svg.selectAll("*").remove();
    };
  }, [data, detalhes, valor, categoria, calculoValor]);

  return (
    <div className="Treemap" ref={svgRef} id="div_template" style={{ position: "relative" }}></div>
  );
}

export default TreemapChart;
