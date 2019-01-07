import React from 'react';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import OutOfBoundsSnackbar from './OutOfBoundsSnackbar';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

class DroneQuadrant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.onClickAddHandler = this.onClickAddHandler.bind(this);
        this.onClickDeleteHandler = this.onClickDeleteHandler.bind(this);
    }

    onClickAddHandler() {
        const drone = {
            x: 150,
            y: 150,
            quadrant: 1,
        };
        axios.post('http://localhost:4001/api/drones', drone);
    }

    onClickDeleteHandler() {

    }

    componentDidUpdate(prevProps) {
        const { data } = this.props;
        if (this.props.data !== prevProps.data) {
            let openSnackbar = false;
            let droneId;
            data.forEach(drone => {
                if (Number(drone.x) > 300 || Number(drone.x) < 0 || Number(drone.y) > 300 || Number(drone.y) < 0) {
                    openSnackbar = true;
                    droneId = drone.id;
                }
            });
            this.setState({
                open: openSnackbar,
                droneId,
            });
        }
    }

    render() {
        const { data, classes } = this.props;
        return (<React.Fragment>
            <ResponsiveScatterPlot
                data={data}
                margin={{
                    "top": 60,
                    "right": 140,
                    "bottom": 70,
                    "left": 90
                }}
                xScale={{
                    "type": "linear",
                    "min": 0,
                    "max": 300
                }}
                yScale={{
                    "type": "linear",
                    "min": 0,
                    "max": 300
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    "orient": "bottom",
                    "tickSize": 5,
                    "tickPadding": 5,
                    "tickRotation": 0,
                    "legend": "Y",
                    "legendPosition": "middle",
                    "legendOffset": 46
                }}
                axisLeft={{
                    "orient": "left",
                    "tickSize": 5,
                    "tickPadding": 5,
                    "tickRotation": 0,
                    "legend": "X",
                    "legendPosition": "middle",
                    "legendOffset": -60
                }}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                legends={[
                    {
                        "anchor": "bottom-right",
                        "direction": "column",
                        "translateX": 130,
                        "itemWidth": 100,
                        "itemHeight": 12,
                        "itemsSpacing": 5,
                        "itemTextColor": "#999",
                        "symbolSize": 12,
                        "symbolShape": "circle",
                        "effects": [
                            {
                                "on": "hover",
                                "style": {
                                    "itemTextColor": "#000"
                                }
                            }
                        ]
                    }
                ]}
            />
            <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.onClickAddHandler} >
                <AddIcon />
            </Fab>
            <Fab color="secondary" aria-label="Edit" className={classes.fab} onClick={() => console.log('HOLIPIS')}>
                <DeleteIcon />
            </Fab>
            <OutOfBoundsSnackbar open={this.state.open} droneId={this.state.droneId} />
        </React.Fragment>);
    }
}

export default withStyles(styles)(DroneQuadrant);
