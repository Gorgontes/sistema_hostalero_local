import { Input } from '@chakra-ui/react'


type Props = {
    label: string;
    count: string;
};

const BcTextAndCount = ({ label, count }: Props) => {
    return (
        <div className="flex  my-1 py-2 px-2 mx-0">
            <div className="text-primario">
                {label}
            </div>
            <div className="ml-auto w-[60px]">
                {/* {count} */}
                <Input borderColor={'primario'} className="text-center" value={count} />
            </div>
        </div>
    );
}

export default BcTextAndCount;