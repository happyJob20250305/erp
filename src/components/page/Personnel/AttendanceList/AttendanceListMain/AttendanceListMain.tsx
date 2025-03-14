import { AttendanceListMainStyled } from './styled';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../../stores/modalState';
import { Portal } from '../../../../common/potal/Portal';
import { AttendanceListModal } from '../AttendanceListModal/AttendanceListModal';
import { searchApi } from '../../../../../api/PersonnelApi/searchApi';
import { AttendanceList } from '../../../../../api/api';
import { IAttendance } from '../../../../../models/interface/personnel/Attendance/IAttendance';
import { IEvent } from '../../../../../models/interface/personnel/Attendance/IEvent';

interface IAttendanceListResponse {
    attendanceList: IAttendance[]
}

export const AttendanceListMain = () => {
    const [attendanceList, setAttendanceList] = useState<IAttendance[]>([]);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [searchStDate, setSearchStDate] = useState<string>("");
    const [reqStatus, setReqStatus] = useState<string>("");

    useEffect(() => {
        attendanceCalendar();
    }, [])

    useEffect(() => {
        if (attendanceList.length > 0) {
            makeEvents();
        }
    }, [attendanceList]);

    const attendanceCalendar = async () => {
        const result = await searchApi<IAttendanceListResponse>(AttendanceList.attendanceCalendar);

        if (result) {
            setAttendanceList(result.attendanceList);
        }
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
            let date = key.substring(0, 10);
            let reqStatus = key.substring(11);
            let title = `${reqStatus} ${value}건`
            switch (reqStatus) {
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
                default:
                    break;
            }
        });
        setEvents(myevents);
    }

    const handlerModal = (id: Date, color: string) => {
        let eventDay = new Date(id);
        let year = eventDay.getFullYear();
        let month = ('0' + (eventDay.getMonth() + 1)).slice(-2);
        let day = ('0' + eventDay.getDate()).slice(-2);
        let dateString = year + '-' + month + '-' + day;
        setSearchStDate(dateString);

        switch (color) {
            case "#71C379": //승인
                setReqStatus("S");
                break;
            case "#E6B800"://승인 대기
                setReqStatus("F");
                break;
            case "#5B91D4"://검토 대기
                setReqStatus("W");
                break;
            case "#E57373"://반려
                setReqStatus("N");
                break;
            default:
                break;
        }
        setModal(!modal);
    }

    const renderEventContent = (eventInfo) => {
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
                height={750}
                eventClick={(e) => { handlerModal(e.event.start, e.event.backgroundColor) }}
            />
            {
                modal && (
                    <Portal>
                        <AttendanceListModal reqStatus={reqStatus} searchStDate={searchStDate} />
                    </Portal>
                )
            }
        </AttendanceListMainStyled>
    )
}