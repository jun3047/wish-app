import Realm, { ObjectSchema } from 'realm';
import SchoolList from './schoolList.json';
import { useEffect, useState } from 'react';

const useSchoolRealm = () => {

    class School {}

    const SchoolSchema: ObjectSchema = {
        name: 'School',
        properties: {
            name: 'string',
            location: 'string',
            id: 'int',
        },
        primaryKey: 'id',
    };

    const [realm, setRealm] = useState<Realm>(new Realm({ schema: [SchoolSchema] }));

    useEffect(() => {

        try{
            Realm.deleteFile({});
            realm.write(() => {
                let id = 0;
                SchoolList.forEach(school => {
                    realm.create('School', {...school, id: id++});
                });
            });
        }
        catch(e){
            console.log(e);
        }
    
        return () => {
            realm.close();
        };
    }, []);

    const filterItemsByKeyword = (
        keyword: string,
        endIndex: number,
        ) => {
    
        const filteredSchools = realm.objects<School>('School').filtered(`name CONTAINS[c] "${keyword}"`);
        return filteredSchools.slice(0, endIndex);
    };

    return {
        filterItemsByKeyword,
    }
}

export default useSchoolRealm;


