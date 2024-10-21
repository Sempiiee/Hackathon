import { Configuration } from 'Database/entities/configuration';
import { Response, Request } from 'express';

export default class ApisController {
    static async greet(request: Request, response: Response) {
        response.json({ greeting: `Hello, ${request.query.name}` });
    }

    // New signup method
    static async insert_configuration(request: Request, response: Response) {
        const {
            firstName,
            middleInitial,
            lastName,
            region,
            email,
            password,
            waterConsumptionEntry1,
            waterConsumptionEntry2,
            waterConsumptionEntry3,
            waterConsumptionEntry4,
            waterConsumptionEntry5,
            waterConsumptionEntry6,
            waterConsumptionEntry7,
            waterConsumptionEntry8,
            waterConsumptionEntry9,
            waterConsumptionEntry10,
            goal1,
            goal2,
            goal3,
            goal4,
            goal5,
        } = request.body;

        const existingUser = await Configuration.findOne({ where: { email } });
        if (existingUser) {
            return response.json({
                status: 0,
                message: "Email is already registered!",
            });
        }

        const newUserConfiguration = await Configuration.create({
            firstName,
            middleInitial,
            lastName,
            region,
            email,
            password,
            waterConsumptionEntry1,
            waterConsumptionEntry2,
            waterConsumptionEntry3,
            waterConsumptionEntry4,
            waterConsumptionEntry5,
            waterConsumptionEntry6,
            waterConsumptionEntry7,
            waterConsumptionEntry8,
            waterConsumptionEntry9,
            waterConsumptionEntry10,
            goal1,
            goal2,
            goal3,
            goal4,
            goal5,
        }).save();

        response.json({
            status: 1,
            message: "Signup successful!",
            data: newUserConfiguration,
        });
    }

    // New login method
    static async login(request: Request, response: Response) {
        const { email, password } = request.body;

        // Find the user by email
        const user = await Configuration.findOne({ where: { email } });

        if (!user) {
            return response.json({
                status: 0,
                message: "Email not found!",
            });
        }

        // Check if the password matches (In a real app, you'd compare hashed passwords)
        if (user.password !== password) {
            return response.json({
                status: 0,
                message: "Incorrect password!",
            });
        }

        // Successful login
        response.json({
            status: 1,
            message: "Login successful!",
            data: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                region: user.region,
                // Add any other necessary user details here
            },
        });
    }

    static async configurations(request: Request, response: Response) {
        const configurations = await Configuration.find();

        response.json({
            status: 1,
            data: configurations,
        });
    }


    //// INSERT DATA 

    // Update water consumption logic
    static async updateWaterConsumption(request: Request, response: Response) {
        const { email, totalWaterConsumption } = request.body;

        // Find user by email
        const user = await Configuration.findOne({ where: { email } });

        if (!user) {
            return response.status(404).json({
                status: 0,
                message: "User not found!",
            });
        }

        // Update the first empty water consumption entry
        if (!user.waterConsumptionEntry1) {
            user.waterConsumptionEntry1 = totalWaterConsumption;
        } else if (!user.waterConsumptionEntry2) {
            user.waterConsumptionEntry2 = totalWaterConsumption;
        } else if (!user.waterConsumptionEntry3) {
            user.waterConsumptionEntry3 = totalWaterConsumption;
        } else if (!user.waterConsumptionEntry4) {
            user.waterConsumptionEntry4 = totalWaterConsumption;
        } else if (!user.waterConsumptionEntry5) {
            user.waterConsumptionEntry5 = totalWaterConsumption;
        } else if (!user.waterConsumptionEntry6) {
            user.waterConsumptionEntry6 = totalWaterConsumption;
        } else if (!user.waterConsumptionEntry7) {
            user.waterConsumptionEntry7 = totalWaterConsumption;
        } else if (!user.waterConsumptionEntry8) {
            user.waterConsumptionEntry8 = totalWaterConsumption;
        } else if (!user.waterConsumptionEntry9) {
            user.waterConsumptionEntry9 = totalWaterConsumption;
        } else if (!user.waterConsumptionEntry10) {
            user.waterConsumptionEntry10 = totalWaterConsumption;
        } else {
            return response.json({
                status: 0,
                message: "All water consumption entries are full!",
            });
        }

        // Save the updated user data
        await user.save();

        return response.json({
            status: 1,
            message: "Water consumption updated successfully!",
            data: user,
        });
    }


    //// Fetch Statistics

    // Fetch water consumption statistics for a user
    static async fetchWaterConsumptionStats(request: Request, response: Response) {
        const { email } = request.body;

        // Find the user by email
        const user = await Configuration.findOne({ where: { email } });

        if (!user) {
            return response.json({
                status: 0,
                message: "User not found!",
            });
        }

        // Get the water consumption entries
        const waterConsumptionEntries = [
            user.waterConsumptionEntry1,
            user.waterConsumptionEntry2,
            user.waterConsumptionEntry3,
            user.waterConsumptionEntry4,
            user.waterConsumptionEntry5,
            user.waterConsumptionEntry6,
            user.waterConsumptionEntry7,
        ];

        response.json({
            status: 1,
            data: waterConsumptionEntries,
        });
    }

    ///// Fetch LEADERBOARD

    static async fetchLeaderBoard(request: Request, response: Response) {
        try {
            // Fetch all users and their water consumption entries
            const users = await Configuration.find();

            // Calculate the total water consumption for each user
            const leaderboard = users.map(user => {
                const totalWaterConsumption = [
                    user.waterConsumptionEntry1 || 0,
                    user.waterConsumptionEntry2 || 0,
                    user.waterConsumptionEntry3 || 0,
                    user.waterConsumptionEntry4 || 0,
                    user.waterConsumptionEntry5 || 0,
                    user.waterConsumptionEntry6 || 0,
                    user.waterConsumptionEntry7 || 0,
                ].reduce((acc, entry) => acc + entry, 0);

                return {
                    lastName: user.lastName,
                    region: user.region,
                    totalWaterConsumption, // Summing up the week's water consumption
                };
            });

            // Sort the leaderboard by total water consumption in ascending order
            leaderboard.sort((a, b) => a.totalWaterConsumption - b.totalWaterConsumption);

            // Return the sorted leaderboard
            response.json({
                status: 1,
                data: leaderboard,
            });
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            response.status(500).json({
                status: 0,
                message: 'Failed to fetch leaderboard',
            });
        }
    }


    /// Fetch Profile
    static async fetchProfile(request: Request, response: Response) {
        const { email } = request.body;
    
        // Find the user by email
        const user = await Configuration.findOne({ where: { email } });
    
        if (!user) {
            return response.json({
                status: 0,
                message: "User not found!",
            });
        }
    
        // Get the user details
        const Profile = {
            name: user.firstName + ' ' + user.middleInitial + '. ' + user.lastName,
            address: user.region, // Assuming region represents the address
            email: user.email,
            password: user.password, // Adjust this as necessary
        };
    
        response.json({
            status: 1,
            data: Profile,
        });
    }
}