import { AttendanceListMainStyled } from './styled';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

export interface IAttendance {
    id: number,
    attId: number,
    attAppId: number,
    empId: number,
    number: number,
    reqType: string,
    reqSt: string,
    reqEd: string,
    reqStatus: string,
    name: string,
    appType: string | null,
    appReason: string | null,
}

interface IAttendanceListResponse {
    attendanceList: IAttendance[]
}

interface IEvent {
    title: string,
    date: string,
    color: string
}

export const AttendanceListMain = () => {
    const [attendanceList, setAttendanceList] = useState<IAttendance[]>([]);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [isEvent, setIsEvent] = useState<boolean>(false);

    useEffect(() => {
        attendanceCalendar();
    }, [])

    useEffect(() => {
        if (attendanceList.length > 0) {
            makeEvents();
        }
    }, [attendanceList]);


    const attendanceCalendar = () => {
        axios.post("/personnel/attendanceCalendar.do")
            .then((res: AxiosResponse<IAttendanceListResponse>) => {
                setAttendanceList(res.data.attendanceList);
            })

    }

    const makeEvents = () => {
        const dataMap = new Map();

        for (const attendance of attendanceList) {
            const reqSt = attendance.reqSt;
            const reqStatus = attendance.reqStatus;
            const key = `${reqSt}-${reqStatus}`; // 날짜와 상태를 결합하여 키 생성

            if (dataMap.has(key)) {
                let val = dataMap.get(key) + 1;
                dataMap.set(key, val);
            } else {
                dataMap.set(key, 1);
            }
        }

        let myevents = [];

        dataMap.forEach((value, key) => {
            console.log("key: " + key + ", value: " + value);

            let date = key.substring(0, 10);
            let reqStatus = key.substring(11);
            let title = `${reqStatus} ${value}건`
            switch (reqStatus) {
                case "검토 대기":
                    myevents.push({
                        title: title,
                        date: date,
                        color: '#5B91D4'
                    })
                    break;
                case "반려":
                    myevents.push({
                        title: title,
                        date: date,
                        color: '#E57373'
                    })
                    break;
                case "승인":
                    myevents.push({
                        title: title,
                        date: date,
                        color: '#71C379'
                    })
                    break;
                case "승인 대기":
                    myevents.push({
                        title: title,
                        date: date,
                        color: '#E6B800'
                    })
                    break;
                default:
                    break;
            }
        });
        setEvents(myevents);
    }

    function renderEventContent(eventInfo) {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </>
        )
    }
    return (
        <AttendanceListMainStyled>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                events={events}
                eventContent={renderEventContent}
                locale={'ko'}
            />
        </AttendanceListMainStyled>
    )
}