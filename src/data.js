import moment from 'moment';



export const data = {
    header: 'Matas Rosengårdscentret',
    address: 'Ørbækvej 75, 5220 Odense',
    tlf: '66 15 96 68',
    cvr: '27528430',
    butiksnr: '10040',
    betjening: 'Hesehus POS',
    kasse:'5',
    tidspunkt: moment().format("DD/MM/YYYY, k:mm"),
    bon: '14192000057464',
    openinghours: {
        mandag: '10.00 - 19.00',
        tirsdag: '10.00 - 19.00',
        onsdag: '10.00 - 19.00',
        torsdag: '10.00 - 19.00',
        fredag: '10.00 - 19.00',
        lørdag: '10.00 - 17.00',
        søndag: '10.00 - 17.00',
          
    },
    bytteservice: ['Landsdækkende bytteservice i Matas.','Husk byttemærke eller bon. Se mere på matas.dk'],
    club: "BESKED FRA CLUB MATAS"
};