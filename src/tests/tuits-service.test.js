import {
    createUser,
    deleteUsersByUsername
} from "../services/users-service";

import {
    createTuit,
    deleteTuit,
    findTuitById,
    findAllTuits,
    deleteTuitsByAuthor, deleteTuitsByContent,
} from "../services/tuits-service";

describe('can create tuit with REST API', () => {
    const testUser = {
        username: 'test_user',
        password: 'test_user_pass',
        email: 'test_user@test.com'
    }
    const testTuit = {
        tuit: "Testing!!"
    }
    beforeAll(async () => {
        await deleteUsersByUsername(testUser.username);
    })
    afterAll(async () => {
        await deleteUsersByUsername(testUser.username);
        await deleteTuit(newTuit._id);
    })

    test('can insert new tuits using REST API', async () => {
        const newUser = await createUser(testUser);
        const newTuit = await createTuit(newUser._id, testTuit)

        expect(newTuit.tuit).toEqual(testTuit.tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);
    })
});

describe('can delete tuit with REST API', () => {

    const testUser = {
        username: 'test_user',
        password: 'test_user_pass',
        email: 'test_user@test.com'
    }
    const testTuit = {
        tuit: "Testing!!!"
    }
    beforeAll(async () => {
        await deleteUsersByUsername(testUser.username);
    })
    afterAll(async () => {
        //await deleteTuit(testTuit._id);
        await deleteUsersByUsername(testUser.username);
    })
    test('can delete users from REST API by tid', async () => {
        const newUser = await createUser(testUser);
        const newTuit = await createTuit(newUser._id, testTuit)
        const status = await deleteTuit(newTuit._id);
        expect(status.deletedCount).toBe(1);

    })
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    const testUser = {
        username: 'test_user',
        password: 'test_user_pass',
        email: 'test_user@test.com'
    }
    const testTuit = {
        tuit: "Testing!!!",
    }
    beforeAll(async () => {
        await deleteUsersByUsername(testUser.username);
    })
    afterAll(async () => {
        await deleteTuit(newTuit._id);
        await deleteUsersByUsername(testUser.username);
    })

    test('can find a tuit by its primary key', async () => {
        const newUser = await createUser(testUser);
        const newTuit = await createTuit(newUser._id, testTuit)

        expect(newTuit.tuit).toEqual(testTuit.tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);

        const retrievedTuit = await findTuitById(newTuit._id);

        expect(retrievedTuit.tuit).toEqual(testTuit.tuit);
        expect(retrievedTuit.postedBy._id).toEqual(newUser._id);
    })
});

describe('can retrieve all tuits with REST API', () => {
    let newUser;
    const testTuits = ["First_Tuit", "Second_Tuit", "Third_Tuit"];
    const testUser = {
        username: 'test_user',
        password: 'test_user_pass',
        email: 'test_user@test.com'
    }
    beforeAll(async () => {
        await deleteUsersByUsername(testUser.username);
        newUser = await createUser(testUser);
        await createTuit(newUser._id, {tuit: testTuits[0]});
        await createTuit(newUser._id, {tuit: testTuits[1]});
        await createTuit(newUser._id, {tuit: testTuits[2]});
    })
    afterAll(async () => {
        await deleteUsersByUsername(testUser.username);
        await deleteTuitsByAuthor(newUser._id);
    })

    test('can find all tuits', async () => {
        const retrievedTuits = await findAllTuits();
        expect(retrievedTuits.length).toBeGreaterThanOrEqual(testTuits.length);

        const insertedTuits = retrievedTuits.filter(tuit =>
            tuit.postedBy._id === newUser._id
        )

        insertedTuits.forEach(tuit => {
            const tuitContent = testTuits.find(testTuit => testTuit === tuit.tuit);
            expect(tuit.tuit).toEqual(tuitContent);
            expect(tuit.postedBy._id).toEqual(newUser._id);
        })
    })
});