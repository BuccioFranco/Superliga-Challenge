import ContentDisplay from '../components/ContentDisplay';
import CsvReader from '../components/FileUploader';
import Sidebar from '../components/SideBar';
import { useDataLoader } from '../hooks/useDataLoader';

const Home: React.FC = () => {
  const { dataLoaded, loadData, clearData, currentComponent, changeComponent, isVisible } = useDataLoader();

  return (
    <div className="h-screen w-screen flex p-4 items-center">
      <div className="w-1/2 flex flex-col items-start justify-start">
        <CsvReader onDataLoad={loadData} onClearData={clearData} />
      </div>
      <div className="h-screen w-screen flex p-4">
        {dataLoaded && (
          <>
            <div className="w-1/6 flex flex-col items-center justify-center pr-4">
              <Sidebar onComponentChange={changeComponent} currentComponent={currentComponent} />
            </div>
            <div className="flex-grow flex items-center justify-center w-1/4">
              <ContentDisplay isVisible={isVisible} currentComponent={currentComponent} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
