import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  selectDashBoardHighesStudentList,
  selectDashBoardLoading,
  selectDashBoardLowesStudentList,
  selectDashBoardStatistics,
  selectDashRankingByCityList,
} from "./dashBoardSlice";
import Box from "@mui/material/Box";
import { Grid, LinearProgress, Typography } from "@mui/material";
import StatisticItem from "./components/StatisticItem";
import {
  ChatBubble,
  ChatRounded,
  LinearScaleSharp,
  PeopleAlt,
} from "@mui/icons-material";
import Widget from "./components/Widget";
import StudentRankingList from "./components/StudentRankingList";
interface DashboardProps {}
function Dashboard(props: DashboardProps) {
  const dispatch = useDispatch();
  const statistic = useSelector(selectDashBoardStatistics);
  const loading = useSelector(selectDashBoardLoading);
  const highesStudentList = useSelector(selectDashBoardHighesStudentList);
  const lowesStudentList = useSelector(selectDashBoardLowesStudentList);
  const rankingByCityList = useSelector(selectDashRankingByCityList)
  useEffect(() => {
    dispatch(fetchData());
  }, []);
  return (
    <Box>
      {loading && <LinearProgress />}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" />}
            label="male"
            value={statistic.maleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ChatRounded fontSize="large" />}
            label="female"
            value={statistic.femaleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ChatBubble fontSize="large" />}
            label="mark >= 8"
            value={statistic.highMarkCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<LinearScaleSharp fontSize="large" />}
            label="mark <= 5"
            value={statistic.lowMarkCount}
          />
        </Grid>
      </Grid>
      <Box mt={4}>
        <Typography variant="h4">All Students</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Widget title="Student with highest mark">
              <StudentRankingList studentList={highesStudentList} />
            </Widget>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Widget title="Student with lowest mark">
              <StudentRankingList studentList={lowesStudentList} />
            </Widget>
          </Grid>
        </Grid>
      </Box>
      <Box mt={4}>
        <Typography variant="h4">Ranking by city</Typography>
        <Grid container spacing={3}>
        {rankingByCityList.map(ranking => (
               <Grid item xs={12} md={6} lg={3} key={ranking.cityId}>
               <Widget title={ranking.cityName}>
                 <StudentRankingList studentList={ranking.rankingList} />
               </Widget>
             </Grid>
        ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Dashboard;
