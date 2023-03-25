module.exports  = function generateUser() {
    const genders = ["male", "female"];
    const firstNames = ["Aarav", "Aditya","Amit","Arjun","Aryan","Karan","Manish","Rahul","Siddharth","Vikram","Aditi","Anjali","Avni","Divya","Jhanvi","Khushi","Neha","Riya","Sakshi",];
    const lastNames = ["a","b","c","D","e"];

    const person = {};
    // person.personId = Math.floor(Math.random() * 1000000).toString();
    person.gender = genders[Math.floor(Math.random() * genders.length)];
    person.dob = new Date(Math.floor(Math.random() * (Date.now() - new Date(1970, 0, 1).getTime())) + new Date(1970, 0, 1).getTime()).toISOString().slice(0, 10);
    person.dod = new Date(new Date(person.dob).getTime() + ((Math.floor(Math.random() * 50)) * 12 * 30 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10);;
    const fromDate =  new Date(Math.floor(Math.random() * (Date.now() - new Date(1970, 0, 1).getTime())) + new Date(1970, 0, 1).getTime()).toISOString().slice(0, 10);
    const toDate = new Date(new Date(fromDate).getTime() + ((Math.floor(Math.random() * 50)) * 12 * 30 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10);
  
    person.name = {
        first: firstNames[Math.floor(Math.random() * firstNames.length)],
        middle: String.fromCharCode(Math.floor(Math.random() * 26) + 65),
        last: lastNames[Math.floor(Math.random() * lastNames.length)],
    };
    person.addresses= [
        {
          from: fromDate, // YYYY-MM-DD
          to: toDate, // YYYY-MM-DD, will be empty for current address
          addressId: "String",
        },
      ]

    return person;
}
