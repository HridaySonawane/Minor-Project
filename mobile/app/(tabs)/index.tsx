import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { roleProfiles } from '@/constants/mineops';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function LandingScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const palette = Colors[colorScheme];
  const accent = palette.tint;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.background }]} edges={['top']}>
      <ScrollView
        style={{ backgroundColor: palette.background }}
        contentContainerStyle={[styles.scrollContent, { backgroundColor: palette.background }]}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.navbar, { borderBottomColor: palette.border }]}>
          <View>
            <ThemedText type="subtitle" style={styles.brand}>
              MineOps
            </ThemedText>
            <ThemedText style={{ color: palette.muted, fontSize: 13, lineHeight: 18 }}>
              Coal Mine Safety System
            </ThemedText>
          </View>

          <Link href="/login" asChild>
            <Pressable style={({ pressed }) => [styles.loginButton, { backgroundColor: accent }, pressed && styles.pressed]}>
              <ThemedText lightColor="#111111" darkColor="#111111" style={styles.loginButtonText}>
                Login
              </ThemedText>
            </Pressable>
          </Link>
        </View>

        <View style={[styles.heroCard, { backgroundColor: palette.surfaceElevated, borderColor: palette.border }]}>
          <View
            style={[
              styles.heroGlow,
              { backgroundColor: accent, opacity: colorScheme === 'dark' ? 0.18 : 0.1 },
            ]}
          />
          <View style={[styles.heroAccent, { backgroundColor: accent }]} />
          <ThemedText type="title">Coal Mine Safety & Productivity System</ThemedText>
          <ThemedText style={[styles.heroCopy, { color: palette.muted }]}>
            Real-time monitoring, incident reporting, and role-based control for safer and smarter mining operations.
          </ThemedText>

          <View style={styles.heroActions}>
            <Link href="/login" asChild>
              <Pressable style={({ pressed }) => [styles.primaryButton, { backgroundColor: accent, opacity: pressed ? 0.88 : 1 }]}>
                <ThemedText lightColor="#111111" darkColor="#111111" style={styles.primaryButtonText}>
                  Get Started
                </ThemedText>
              </Pressable>
            </Link>

            <Link href={{ pathname: '/login', params: { demo: 'true' } }} asChild>
              <Pressable style={({ pressed }) => [styles.secondaryButton, { borderColor: palette.border, backgroundColor: palette.surface }, pressed && styles.pressed]}>
                <ThemedText style={{ fontSize: 14, fontWeight: '700' }}>Demo Mode</ThemedText>
              </Pressable>
            </Link>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle">Quick access</ThemedText>
          <ThemedText style={{ color: palette.muted, fontSize: 13, lineHeight: 18 }}>
            Tap a role to open the matching login path.
          </ThemedText>
        </View>

        <View style={styles.roleGrid}>
          {roleProfiles.map((role) => (
            <Link key={role.key} href={{ pathname: '/login', params: { role: role.key } }} asChild>
              <Pressable
                style={({ pressed }) => [
                  styles.roleCard,
                  { backgroundColor: palette.surface, borderColor: palette.border },
                  pressed && styles.pressed,
                ]}>
                <View style={[styles.roleIcon, { backgroundColor: palette.surfaceMuted, borderColor: palette.border }]}>
                  <MaterialIcons name={role.icon} size={22} color={accent} />
                </View>
                <ThemedText style={styles.roleTitle}>{role.label}</ThemedText>
                <ThemedText style={{ color: palette.muted, fontSize: 13, lineHeight: 19 }}>
                  {role.highlight}
                </ThemedText>
              </Pressable>
            </Link>
          ))}
        </View>

        <View style={[styles.footerCard, { backgroundColor: palette.surfaceMuted, borderColor: palette.border }]}>
          <ThemedText style={styles.footerTitle}>MineOps mobile entry point</ThemedText>
          <ThemedText style={{ color: palette.muted, fontSize: 13, lineHeight: 19 }}>
            The app now opens like the web version: a landing page first, login next, and dashboards only after sign-in.
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 120,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 18,
  },
  brand: {
    marginBottom: 2,
  },
  loginButton: {
    minHeight: 40,
    borderRadius: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontSize: 14,
    fontWeight: '800',
  },
  heroCard: {
    borderWidth: 1,
    borderRadius: 28,
    padding: 22,
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute',
    top: -36,
    right: -10,
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  heroAccent: {
    width: 42,
    height: 6,
    borderRadius: 999,
    marginBottom: 18,
  },
  heroCopy: {
    marginTop: 12,
    marginBottom: 18,
    fontSize: 15,
    lineHeight: 23,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 10,
    gap: 4,
  },
  roleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  roleCard: {
    width: '48%',
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
    gap: 10,
    minHeight: 148,
    justifyContent: 'space-between',
  },
  roleIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  footerCard: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
    gap: 8,
    marginTop: 20,
  },
  footerTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
});
