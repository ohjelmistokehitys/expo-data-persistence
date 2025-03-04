import { Screen } from "@/utils/components";
import { styles } from "@/utils/styles";
import { Link } from "expo-router";


export default function Index() {
  return (
    <Screen>
      <Link href="/sqliteShoppingList" style={styles.link}>SQLite ShoppingList</Link>
      <Link href="/firebaseShoppingList" style={styles.link}>Firebase  ShoppingList</Link>
    </Screen>
  );
}

