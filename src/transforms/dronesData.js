exports.transformDronesData = (data) => {
    return data.forEach(drone => {
        const { x, y } = drone;
        drone.data = [{ x, y }];
    })
}