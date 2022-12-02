import * as React from 'react';
import {useLocation} from "react-router-dom";


export default function Content() {
    // const [courseList, setCourseList] = useState([])
    const location = useLocation();
    let content = location.state.course
    console.log(content);
    return (<Reac>Contents</Reac>)
}
