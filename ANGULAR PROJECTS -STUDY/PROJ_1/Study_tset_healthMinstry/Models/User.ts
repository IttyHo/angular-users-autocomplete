export class User {
    id: number=0;
    name: string='';
    username: string='';
    email: string='';
    address: { street: string; suite: string; city: string; zipcode: string; geo: { lat: number; lng: number } }= { street: '', suite: '', city: '', zipcode: '', geo: { lat: 0, lng: 0 } };
    phone: string='';
    website: string='';
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    }= { name: '', catchPhrase: '', bs: '' };
}