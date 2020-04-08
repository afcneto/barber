module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'car_wash',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
