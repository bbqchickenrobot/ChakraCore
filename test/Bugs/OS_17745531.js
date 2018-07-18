
var obj = {};

// create enough pids to pick from
for (let i = 0; i < 20000; i++)
{
    Object.defineProperty(obj, 'prop' + i, {
        value: i,
        writable: true
    });
}

for (let j = 0; j < 127; j++)
{

    var obj1 = {};
    // fill with pids that prone to collisions - to have some empty buckets when inserting 127th property
    for (let i = 0; i < 127; i++)
    {
        Object.defineProperty(obj1, 'prop' + i * 144, {
            value: i,
            writable: true
        });
    }

    // hopefully 'prop<j>' will hash into an empty bucket and it is also a 127th property.
    // we will try multiple j - just in case the empty bucket moves due to minor changes in 
    // hashing or how pids are assigned.
    Object.defineProperty(obj1, 'prop' + j, {
        value: obj['prop' + j],
        writable: true
    });


    // compare the values, also keeps objects alive
    if (obj['prop' + j] != obj1['prop' + j])
    {
        console.log("fail");
    }
}

console.log("pass");
