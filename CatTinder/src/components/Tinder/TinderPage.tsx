import './TinderPage.css';
import TinderDeck from './TinderDeck'; // Assuming you have this component
import CatPreference from '../../models/CatPreference';


interface TinderProfileProps {
  preferences: CatPreference;
}
const TinderPage: React.FC<TinderProfileProps> = (props: TinderProfileProps) => {
  return (
    <div>
      <div className="app">
        <TinderDeck preferences={props.preferences}/>
      </div>
    </div>
  );
};
export default TinderPage;