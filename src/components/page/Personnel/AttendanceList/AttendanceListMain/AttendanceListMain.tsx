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
import { IEvent } from '../../../../../models/interface/personnel/attendance/IEvent';
import { IAttendanceAmt } from '../../../../../models/interface/personnel/attendance/IAttendanceAmt';

interface IAttendanceListResponse {
    attendanceListAmt: IAttendanceAmt[]
}

export const AttendanceListMain = () => {
    const [attendanceListAmt, setAttendanceListAmt] = useState<IAttendanceAmt[]>([]);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [searchStDate, setSearchStDate] = useState<string>("");
    const [reqStatus, setReqStatus] = useState<string>("");

    useEffect(() => {
        attendanceCalendar();
    }, [])

    useEffect(() => {
        if (attendanceListAmt.length > 0) {
            makeEvents();
        }
    }, [attendanceListAmt]);

    const attendanceCalendar = async () => {
        const result = await searchApi<IAttendanceListResponse>(AttendanceList.attendanceCalendar);

        if (result) {
            setAttendanceListAmt(result.attendanceListAmt);
        }
    }

    const makeEvents = () => {
        let myevents = [];

        attendanceListAmt.forEach(function (attendanceAmt) {
            let date = attendanceAmt.reqSt;

            switch (attendanceAmt.reqStatus) {
                case "S":
                    myevents.push({
                        title: `승인 ${attendanceAmt.countReqStatus}건`,
                        date: date,
                        color: '#71C379'
                    })
                    break;
                case "F":
                    myevents.push({
                        title: `승인 대기 ${attendanceAmt.countReqStatus}건`,
                        date: date,
                        color: '#E6B800'
                    })
                    break;
                case "W":
                    myevents.push({
                        title: `검토 대기 ${attendanceAmt.countReqStatus}건`,
                        date: date,
                        color: '#5B91D4'
                    })
                    break;
                case "N":
                    myevents.push({
                        title: `반려 ${attendanceAmt.countReqStatus}건`,
                        date: date,
                        color: '#E57373'
                    })
                    break;
                default:
                    break;
            }

        })
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