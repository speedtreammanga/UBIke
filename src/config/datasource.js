// the 21 bikes
export const BIKES = [{id: 1, code: "9400D3"},{id: 2, code: "4B0082"},{id: 3, code: "0000FF"},{id: 4, code: "4B0082"},{id: 5, code: "9400D3"},{id: 6, code: "FF0000"},{id: 7, code: "FF0000"},{id: 8, code: "0000FF"},{id: 9, code: "00FF00"},{id: 10, code: "9400D3"},{id: 11, code: "00FF00"},{id: 12, code: "FFFF00"},{id: 13, code: "4B0082"},{id: 14, code: "0000FF"},{id: 15, code: "FF7F00"},{id: 16, code: "9400D3"},{id: 17, code: "FFFF00"},{id: 18, code: "00FF00"},{id: 19, code: "9400D3"},{id: 20, code: "0000FF"},{id: 21, code: "FF7F00"},];

// the three racks holding the bikes
export const RACKS_BIKES_RELATIONSHIPS = [
    {
        rack_id: 111,
        bikes: [{id: 1, code: "9400D3"},{id: 2, code: "4B0082"},{id: 3, code: "0000FF"},{id: 4, code: "4B0082"},{id: 5, code: "9400D3"},{id: 6, code: "FF0000"},]
    },
    {
        rack_id: 222,
        bikes: [{id: 7, code: "FF0000"},{id: 8, code: "0000FF"},{id: 9, code: "00FF00"},{id: 10, code: "9400D3"},{id: 11, code: "00FF00"},]
    },
    {
        rack_id: 333,
        bikes: [{id: 12, code: "FFFF00"},{id: 13, code: "4B0082"},{id: 14, code: "0000FF"},{id: 15, code: "FF7F00"},{id: 16, code: "9400D3"},{id: 17, code: "FFFF00"},{id: 18, code: "00FF00"},{id: 19, code: "9400D3"},{id: 20, code: "0000FF"},{id: 21, code: "FF7F00"},]
    }
];

// the existing members
export const MEMBERS = [
    {id: 1,fname: "Moses",lname: "Wong",email: "moses@ubike.com",phone: "(870) 1073570"}, 
    {id: 2,fname: "Leontine",lname: "Matkin",email: "leontine@ubike.com",phone: "(394) 8673618"}, 
    {id: 3,fname: "Cristi",lname: "Ellerman",email: "cristi@ubike.com",phone: "(267) 4047084"}, 
    {id: 4,fname: "Markos",lname: "Ferreo",email: "markos@ubike.com",phone: "(986) 5154324"}, 
    {id: 5,fname: "Corry",lname: "Turrill",email: "corry@ubike.com",phone: "(840) 8879584"}
];

// the system admins
// not used at this point.
export const ADMINS = [{id: 1, email: "admin1@ubike.com"},{id: 2, email: "admin2@ubike.com"},];