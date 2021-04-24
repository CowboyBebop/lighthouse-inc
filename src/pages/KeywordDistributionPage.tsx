import React, { useState, Fragment } from "react";
import { createStyles, fade, Theme, makeStyles } from "@material-ui/core/styles";

//D3
import * as d3 from "d3";
import { PieArcDatum } from "d3-shape";

//MUI Components
import Paper from "@material-ui/core/Paper";

//data
import {
  EyegleSpies as keywordQueries,
  PeopleBook as users,
  calculateKeywords,
  KeywordLength,
} from "../data";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      textAlign: "left",
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },

    container: {
      height: "calc(100vh - 64px - 64px )",
      width: "calc(100wh - 64px)",
      margin: "32px 32px",
    },

    search: {
      color: theme.palette.primary.light,
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.black, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.black, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputInput: {
      color: theme.palette.primary.light,
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "25ch",
    },

    table: {
      minWidth: 650,
    },
  })
);

interface Props {
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const KeywordDistributionPage = (props: Props) => {
  const classes = useStyles();
  const [userSearchQuery, setUserSearchQuery] = useState<string | undefined>(undefined);
  const { toggleDrawer } = props;

  let outerRadius = 350;
  let keywordData: KeywordLength[] = [];

  React.useEffect(() => {
    keywordData = calculateKeywords(keywordQueries);
  }, []);

  React.useEffect(() => {
    console.log(keywordData);
    drawChart();
  }, [keywordData]);

  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };

  const width = 2 * outerRadius + margin.left + margin.right;
  const height = 2 * outerRadius + margin.top + margin.bottom;

  const drawChart = () => {
    const colorScale = d3
      .scaleSequential()
      .interpolator(d3.interpolateCool)
      .domain([0, keywordData.length]);

    d3.select("#pie-container").select("svg").remove();

    const svg = d3
      .select("#pie-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arcGenerator = d3
      .arc<PieArcDatum<KeywordLength>>()
      .innerRadius(0)
      .padRadius(100)
      .padAngle(3 / 50)
      .outerRadius(outerRadius)
      .startAngle((d) => {
        return d.startAngle + Math.PI / 4;
      })
      .endAngle((d) => {
        return d.endAngle + Math.PI / 4;
      })
      .cornerRadius(4);

    const pieGenerator = d3
      .pie<KeywordLength>()
      .padAngle(0)
      .value((d) => d.frequency);

    const arc = svg.selectAll().data(pieGenerator(keywordData)).enter();

    // Append arcs
    arc
      .append("path")
      .attr("d", arcGenerator)
      .style("fill", (_, i) => colorScale(i))
      .style("stroke", "grey")
      .style("stroke-width", 0.5);

    // Append text labels
    arc
      .append("g")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("color", "#ffffff")
      .join("g")
      .call((text) =>
        text
          .append("text")
          .attr("transform", (d, i) => {
            var r =
              arcGenerator.innerRadius()(d) + arcGenerator.outerRadius()(d) - outerRadius * 0.2;
            var a = (arcGenerator.startAngle()(d) + arcGenerator.endAngle()(d)) / 2 - Math.PI / 2;
            let x = Math.cos(a) * r;
            let y = Math.sin(a) * r;

            return `translate(${x}, ${y})`;
          })
          .attr("font-size", "14")
          .attr("font-weight", "bold")
          .text((d) => {
            return `length: ${d.data.keywordLength}`;
          })
      )
      .call((text) =>
        text
          .append("text")
          .attr("transform", (d, i) => {
            var r =
              arcGenerator.innerRadius()(d) + arcGenerator.outerRadius()(d) - outerRadius * 0.6;
            var a = (arcGenerator.startAngle()(d) + arcGenerator.endAngle()(d)) / 2 - Math.PI / 2;
            let x = Math.cos(a) * r;
            let y = Math.sin(a) * r;

            return `translate(${x}, ${y})`;
          })
          .attr("color", "white")
          .attr("font-size", "14")
          .text((d) => {
            if (d.data.frequency != 1) return d.data.frequency;
            else return "";
          })
      );
  };

  return (
    <Fragment>
      <Paper className={classes.container} elevation={3}>
        <div id="pie-container" />
      </Paper>
    </Fragment>
  );
};

export default KeywordDistributionPage;
