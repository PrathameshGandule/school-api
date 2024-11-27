import { poolPromise } from '../db.js'
import { calculateDistanceAndSort } from '../utils/distanceCalculator.js'
import { getFromCache , addToCache , clearAllCache} from '../utils/cacheHandler.js'

// METHOD TO ADD A SCHOOL IN SCHOOLS TABLE
let addSchool = async (req, res) => {

    // TAKING INPUTS THROUGH BODY
    const { name, address, latitude, longitude } = req.body;

    // CHECKING FOR ALL PARAMETER'S EXISTENCE
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required - name, address, latitude, longitude' 
        });
    }

    try {

        // QUERY AND VALUES TO BE INSEERTED
        let insertQuery = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        let insertValuesArray = [name, address, parseFloat(latitude), parseFloat(longitude)];

        // QUERY EXECUTION
        const [result] = await poolPromise.query(insertQuery , insertValuesArray);

        // CLEAR ALL CACHE BECAUSE OF NEW ENTRY
        clearAllCache();

        // BOOLEAN VALUE OF SUCCESS, CONFIRMATION MESSAGE, AND AUTO-GENERATED ID IS RETURNED 
        res.status(201).json({ 
            success: true,
            message: 'School added successfully.', 
            schoolId: result.insertId 
        });

    } catch (err) {
        console.error(err);

        // BOOLEAN VALUE OF SUCCESS AND MESSAGE OF ERROR IS RETURNED AS RESPONSE 
        res.status(500).json({
            success: false,
            message: 'Database error.' 
        });
    }
};

let listSchools = async (req, res) => {

    // TAKING AND LAT AND LONG THROUGH QUERY 
    const { latitude, longitude , limit , page } = req.query;

    const LIMIT = parseInt(limit) || 10
    const PAGE = parseInt(page) || 1

    // CHECKING FOR EXISTENCE OF LAT AND LONG
    if (!latitude || !longitude) {
        return res.status(400).json({
            success: false,
            message: 'Latitude and longitude are required in query parameters',
        });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);
    const cacheKey = `${userLat.toFixed(3)},${userLon.toFixed(3)}`;
    const OFFSET = (PAGE - 1) * LIMIT;

    let cachedData = getFromCache(cacheKey);

    // RETURN DATA FROM CACHE IF EXISTS
    if(cachedData){
        res.status(201).json({
            success: true,
            source: "cache",
            pageNo: PAGE,
            totalPages: Math.ceil(Object.keys(cachedData).length / LIMIT),
            data: cachedData.slice(OFFSET, OFFSET + LIMIT),
        });
        return;    
    }

    try {
        // SELECT QUERY EXECUTION
        let selectQuery = 'SELECT * FROM schools'
        const [schools] = await poolPromise.query(selectQuery);

        const sortedSchools = calculateDistanceAndSort(schools, userLat, userLon);

        // ADD NEW RESULTS TO THE CACHE
        addToCache(cacheKey, sortedSchools)

        // RETURN SUCCESSFUL MESSAGE AND LIST OF SCHOOLS IN SORTED ORDER
        res.status(201).json({
            success: true,
            source: "database",
            pageNo: PAGE,
            totalPages: Math.ceil(sortedSchools.length / LIMIT),
            data: sortedSchools.slice(OFFSET, OFFSET + LIMIT),
        });

    } catch (err) {
        console.error(err);
        // RETURN ERROR IF ANY
        res.status(500).json({ 
            success: false,
            message: 'Database error.',
        });
    }
};


export { addSchool , listSchools };