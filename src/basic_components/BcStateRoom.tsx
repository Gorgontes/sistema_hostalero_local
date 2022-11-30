import { BasicStateRoom } from "../constants/enums/BasicStateRoom";


type Props = {
    label: string;
    count: number;
    typeIcon: BasicStateRoom;
};

const BcStateRoom = ({ label, count, typeIcon }: Props) => {
    return (
        <div className="flex ">
            <div className="mr-auto text-primario opacity-80">
                {label}
            </div>
            <div className="font-extrabold text-base">
                {count}
            </div>
            <div className="ml-5 ">
                <_GetFormIcon typeIcon={typeIcon} />
            </div>

        </div>
    );
}

type _Props = {
    typeIcon: BasicStateRoom;
};

const _GetFormIcon = ({ typeIcon }: _Props) => {

    switch (typeIcon) {
        case BasicStateRoom.free:
            return <div className="h-6 w-6 bg-background_main rounded-full border-4 border-primario"></div>;

        case BasicStateRoom.reserved:
            return <div className="h-6 w-6 bg-morado rounded-full"></div>;

        case BasicStateRoom.occupied:
            return <div className="h-6 w-6 bg-primario rounded-full shadow-primario"></div>;

        default:
            return <div className="h-6 w-6 bg-rojo rounded-md shadow-rojo"></div>;
    }
}

export default BcStateRoom;