import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import Header from '@/components/Header'
import { StatusBar } from 'expo-status-bar'
import { useHabits } from '@/src/context/HabitContext'
import { HabitCard } from '@/components/HabitCard'
import { spacing } from '@/src/theme/spacing'
import { useTheme } from '@/src/theme/useTheme'
import { useAuth } from '@/src/context/AuthContext'

const Home = () => {
  const { habits } = useHabits();
  const theme = useTheme();
  const { user } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.backgroundSecondary }]}>
      <StatusBar style={theme.isDark ? "light" : "dark"} />

      <Header 
        name={user?.name?.split(' ')[0] || "User"} 
        subText="Let’s make habits together!" 
        isDark={theme.isDark} 
        onPressCalendar={() => { alert("Coming soon!") }} 
        onPressNotification={() => { alert("Coming soon!") }} 
      />
      <FlatList

        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <HabitCard habit={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBlock: spacing.lg,
  },
})

export default Home