import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from '../../ui/Table';

import ScrolledContainer from "../../ui/ScrolledContainer";
import OverflowedContainer from "../../ui/OverflowedContainer";

import { useCabins } from "./useCabins";
import Menus from "../../ui/Menus";

import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

const CabinTable = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, error, cabins] = useCabins();

  if (error?.message) return <p>{error.message}</p>;
  if (isLoading) return <Spinner />;

  if(cabins.length <= 0) return <Empty resourceName="Cabins" />

  const filterValue = searchParams.get('discount');
  const filteredCabins =
    filterValue === 'with-discount'
      ? cabins.filter(cabin => cabin.discount !== 0)
      : filterValue === 'no-discount'
        ? cabins.filter(cabin => cabin.discount === 0)
        : cabins;

  // propertyName-sortMode
  const sortValue = searchParams.get('sortBy') || 'startDate-asc';
  const [propertyName, mode] = sortValue.split('-');
  const sortedCabins = filteredCabins.sort((a, b) => mode === 'asc' ? a[propertyName] - b[propertyName] : b[propertyName] - a[propertyName]);


  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <ScrolledContainer>
        <OverflowedContainer width="83rem">
          <Table.Header>
            <div></div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </Table.Header>
          <Table.Body data={sortedCabins} render={cabin => (
            <Menus key={cabin.id}>
              <CabinRow cabin={cabin} />
            </Menus>
          )} />
        </OverflowedContainer>
      </ScrolledContainer>
    </Table>
  )
}

export default CabinTable
