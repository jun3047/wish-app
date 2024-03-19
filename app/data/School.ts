import { useEffect, useState } from 'react';
import schoolList from './schoolList.json'; // JSON 파일 불러오기

// School 타입 정의 (필요에 따라 수정)
interface School {
  name: string;
  location: string;
  id: number;
}

const useSchoolData = () => {

  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    setSchools(schoolList);
  }, []);

  const filterItemsByKeyword = (keyword: string, endIndex: number): School[] => {
    const filteredSchools = schools.filter(school =>
      school.name.toLowerCase().includes(keyword.toLowerCase())
    );
    // endIndex를 사용하여 결과 제한
    return filteredSchools.slice(0, endIndex);
  };

  return {
    filterItemsByKeyword,
    initSchoolList: schoolList.slice(0, 20)
  };
};

export default useSchoolData;