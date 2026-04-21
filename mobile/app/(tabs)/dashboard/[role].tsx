import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { type ComponentProps, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { type MineOpsRoleKey, homeMetrics, liveAlerts, roleProfiles } from '@/constants/mineops';
import { useColorScheme } from '@/hooks/use-color-scheme';

type IconName = ComponentProps<typeof MaterialIcons>['name'];
type Palette = typeof Colors.dark;

type DashboardShortcut = {
  key: string;
  title: string;
  detail: string;
  icon: IconName;
  action: string;
};

const roleQuickActions: Record<MineOpsRoleKey, DashboardShortcut[]> = {
  worker: [
    { key: 'incidents', title: 'Report incident', detail: 'Capture severity, location, and witnesses.', icon: 'report', action: 'incidents' },
    { key: 'attendance', title: 'Check in / out', detail: 'Shift attendance and coverage.', icon: 'schedule', action: 'attendance' },
    { key: 'tasks', title: 'View tasks', detail: 'Open assigned work for this shift.', icon: 'assignment', action: 'tasks' },
    { key: 'alerts', title: 'My alerts', detail: 'Review current warnings and notices.', icon: 'notifications', action: 'alerts' },
  ],
  supervisor: [
    { key: 'team', title: 'Team overview', detail: 'Crew status, attendance, and assignments.', icon: 'groups', action: 'team' },
    { key: 'tasks', title: 'Task board', detail: 'Track active work and priorities.', icon: 'assignment', action: 'tasks' },
    { key: 'incidents', title: 'Incidents', detail: 'Open incidents and escalations.', icon: 'report', action: 'incidents' },
    { key: 'alerts', title: 'Alerts', detail: 'Live operational warnings.', icon: 'notifications', action: 'alerts' },
  ],
  safety: [
    { key: 'monitoring', title: 'Safety monitoring', detail: 'Gas, temperature, and zone readings.', icon: 'insights', action: 'monitoring' },
    { key: 'alerts', title: 'Alert feed', detail: 'Critical notices and system warnings.', icon: 'notifications', action: 'alerts' },
    { key: 'incident-review', title: 'Incident review', detail: 'Triage the open review queue.', icon: 'assignment', action: 'incident-review' },
    { key: 'settings', title: 'Settings', detail: 'Response preferences and controls.', icon: 'settings', action: 'settings' },
  ],
  admin: [
    { key: 'users', title: 'Users', detail: 'Manage accounts and access.', icon: 'person', action: 'users' },
    { key: 'roles', title: 'Roles', detail: 'Review permission hierarchy.', icon: 'security', action: 'roles' },
    { key: 'logs', title: 'Logs', detail: 'Audit trail and system events.', icon: 'history', action: 'logs' },
    { key: 'settings', title: 'Settings', detail: 'System preferences and security.', icon: 'settings', action: 'settings' },
  ],
  authority: [
    { key: 'analytics', title: 'Analytics', detail: 'Trends across productivity and safety.', icon: 'analytics', action: 'analytics' },
    { key: 'reports', title: 'Reports', detail: 'Generate compliance and management summaries.', icon: 'description', action: 'reports' },
    { key: 'users', title: 'User control', detail: 'Cross-site access and governance.', icon: 'person', action: 'users' },
    { key: 'system-control', title: 'System control', detail: 'Core policy and settings control.', icon: 'settings', action: 'system-control' },
  ],
};

const roleMenuItems: Record<MineOpsRoleKey, DashboardShortcut[]> = {
  worker: [
    { key: 'dashboard', title: 'Dashboard', detail: 'Shift overview and status', icon: 'dashboard', action: 'dashboard' },
    ...roleQuickActions.worker,
  ],
  supervisor: [
    { key: 'dashboard', title: 'Dashboard', detail: 'Shift overview and status', icon: 'dashboard', action: 'dashboard' },
    ...roleQuickActions.supervisor,
  ],
  safety: [
    { key: 'dashboard', title: 'Dashboard', detail: 'Shift overview and status', icon: 'dashboard', action: 'dashboard' },
    ...roleQuickActions.safety,
    { key: 'global-alerts', title: 'Global alerts', detail: 'Enterprise alert feed', icon: 'notifications', action: 'alerts' },
  ],
  admin: [
    { key: 'dashboard', title: 'Dashboard', detail: 'Shift overview and status', icon: 'dashboard', action: 'dashboard' },
    ...roleQuickActions.admin,
  ],
  authority: [
    { key: 'dashboard', title: 'Dashboard', detail: 'Shift overview and status', icon: 'dashboard', action: 'dashboard' },
    { key: 'analytics', title: 'Analytics', detail: 'Trend analysis and performance', icon: 'analytics', action: 'analytics' },
    { key: 'reports', title: 'Reports', detail: 'Compliance and management exports', icon: 'description', action: 'reports' },
    { key: 'users', title: 'User control', detail: 'Cross-site access and governance', icon: 'person', action: 'users' },
    { key: 'system-control', title: 'System control', detail: 'Core policy and configuration', icon: 'settings', action: 'system-control' },
    { key: 'alerts', title: 'Global alerts', detail: 'Enterprise alerts and escalations', icon: 'notifications', action: 'alerts' },
  ],
};

export default function RoleDashboardScreen() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const colorScheme = useColorScheme() ?? 'dark';
  const palette = Colors[colorScheme];
  const accent = palette.tint;
  const params = useLocalSearchParams<{ role?: string }>();
  const roleValue = Array.isArray(params.role) ? params.role[0] : params.role;
  const selectedRole = roleProfiles.find((role) => role.key === roleValue) ?? roleProfiles[0];
  const shortcuts = roleQuickActions[selectedRole.key];
  const menuItems = roleMenuItems[selectedRole.key];

  const openDashboard = () => {
    router.push({ pathname: '/dashboard/[role]', params: { role: selectedRole.key } });
  };

  const openAction = (action: string) => {
    if (action === 'users') {
      router.push({ pathname: '/users', params: { role: selectedRole.key } });
      return;
    }

    if (action === 'roles') {
      router.push({ pathname: '/roles', params: { role: selectedRole.key } });
      return;
    }

    if (action === 'logs') {
      router.push({ pathname: '/logs', params: { role: selectedRole.key } });
      return;
    }

    if (action === 'settings' || action === 'system-control') {
      router.push({ pathname: '/settings', params: { role: selectedRole.key } });
      return;
    }

    if (action === 'incidents') {
      if (selectedRole.key === 'worker') {
        router.push({ pathname: '/incidents/report', params: { role: selectedRole.key } });
        return;
      }

      router.push({ pathname: '/(tabs)/incidents/index', params: { role: selectedRole.key } });
      return;
    }

    if (action === 'incident-review') {
      router.push({ pathname: '/incidents/review', params: { role: selectedRole.key } });
      return;
    }

    if (action === 'alerts') {
      router.push({ pathname: '/alerts', params: { role: selectedRole.key } });
      return;
    }

    if (action === 'attendance') {
      router.push({ pathname: '/attendance', params: { role: selectedRole.key } });
      return;
    }

    if (action === 'tasks') {
      router.push({ pathname: '/tasks', params: { role: selectedRole.key } });
      return;
    }

    if (action === 'team') {
      router.push({ pathname: '/team', params: { role: selectedRole.key } });
      return;
    }

    if (action === 'monitoring') {
      router.push({ pathname: '/monitoring', params: { role: selectedRole.key } });
      return;
    }

    router.push({ pathname: '/actions/[action]', params: { action, role: selectedRole.key } });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.background }]} edges={['top']}>
      <Modal transparent visible={menuVisible} animationType="fade" onRequestClose={() => setMenuVisible(false)}>
        <View style={styles.menuOverlay}>
          <Pressable style={styles.menuBackdrop} onPress={() => setMenuVisible(false)} />
          <View style={[styles.menuSheet, { backgroundColor: palette.surfaceElevated, borderColor: palette.border }]}>
            <View style={styles.menuHeader}>
              <View>
                <ThemedText type="subtitle">Menu</ThemedText>
                <ThemedText style={{ color: palette.muted, fontSize: 13, lineHeight: 18 }}>
                  {selectedRole.label} shortcuts
                </ThemedText>
              </View>
              <Pressable onPress={() => setMenuVisible(false)} style={({ pressed }) => [styles.menuCloseButton, { backgroundColor: palette.surface, borderColor: palette.border }, pressed && styles.pressed]}>
                <MaterialIcons name="close" size={18} color={palette.text} />
              </Pressable>
            </View>

            <View style={styles.menuList}>
              {menuItems.map((item) => (
                <Pressable
                  key={item.key}
                  onPress={() => {
                    setMenuVisible(false);
                    if (item.action === 'dashboard') {
                      openDashboard();
                      return;
                    }
                    openAction(item.action);
                  }}
                  style={({ pressed }) => [
                    styles.menuItem,
                    { backgroundColor: palette.surface, borderColor: palette.border },
                    pressed && styles.pressed,
                  ]}>
                  <View style={[styles.menuIcon, { backgroundColor: palette.surfaceMuted }]}>
                    <MaterialIcons name={item.icon} size={18} color={accent} />
                  </View>
                  <View style={styles.menuItemBody}>
                    <ThemedText style={styles.menuItemTitle}>{item.title}</ThemedText>
                    <ThemedText style={{ color: palette.muted, fontSize: 12, lineHeight: 18 }}>
                      {item.detail}
                    </ThemedText>
                  </View>
                  <MaterialIcons name="chevron-right" size={18} color={palette.muted} />
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView
        style={{ backgroundColor: palette.background }}
        contentContainerStyle={[styles.scrollContent, { backgroundColor: palette.background }]}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.topBar, { borderBottomColor: palette.border }]}>
          <View style={styles.brandCluster}>
            <Pressable
              onPress={() => setMenuVisible(true)}
              style={({ pressed }) => [styles.menuButton, { backgroundColor: palette.surfaceElevated, borderColor: palette.border }, pressed && styles.pressed]}>
              <MaterialIcons name="menu" size={20} color={palette.text} />
            </Pressable>
            <View>
              <ThemedText type="subtitle" style={styles.brand}>
                MineOps
              </ThemedText>
              <ThemedText style={{ color: palette.muted, fontSize: 13, lineHeight: 18 }}>
                {selectedRole.label} Dashboard
              </ThemedText>
            </View>
          </View>

          <View style={styles.topActions}>
            <Link href="/login" asChild>
              <Pressable style={({ pressed }) => [styles.iconButton, { backgroundColor: palette.surfaceElevated, borderColor: palette.border }, pressed && styles.pressed]}>
                <MaterialIcons name="logout" size={18} color={palette.text} />
              </Pressable>
            </Link>
          </View>
        </View>

        <SectionHeader title="Quick actions" subtitle="Role-specific shortcuts from the same web flow." palette={palette} />
        <View style={styles.actionGrid}>
          {shortcuts.map((action) => (
            <Pressable
              key={action.key}
              onPress={() => openAction(action.action)}
              style={({ pressed }) => [
                styles.actionCard,
                { backgroundColor: palette.surface, borderColor: palette.border },
                pressed && styles.pressed,
              ]}>
              <View style={[styles.actionIcon, { backgroundColor: palette.surfaceMuted }]}>
                <MaterialIcons name={action.icon} size={20} color={accent} />
              </View>
              <View style={styles.actionTextBlock}>
                <ThemedText style={styles.actionTitle}>{action.title}</ThemedText>
                <ThemedText style={{ color: palette.muted, fontSize: 13, lineHeight: 19 }}>
                  {action.detail}
                </ThemedText>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={[styles.heroCard, { backgroundColor: palette.surfaceElevated, borderColor: palette.border }]}>
          <View style={[styles.heroAccent, { backgroundColor: accent }]} />
          <ThemedText type="title">{selectedRole.label} Dashboard</ThemedText>
          <ThemedText style={{ color: palette.muted, fontSize: 15, lineHeight: 22, marginTop: 10 }}>
            {selectedRole.summary}
          </ThemedText>
          <View style={[styles.highlightBox, { backgroundColor: palette.surface, borderColor: palette.border }]}>
            <ThemedText style={{ color: palette.text, fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.6 }}>
              Focus
            </ThemedText>
            <ThemedText style={{ color: palette.text, fontSize: 14, fontWeight: '800', marginTop: 4 }}>
              {selectedRole.highlight}
            </ThemedText>
          </View>
        </View>

        <SectionHeader title="Command metrics" subtitle="A fast read on the shift." palette={palette} />
        <View style={styles.metricGrid}>
          {homeMetrics.map((metric) => (
            <View key={metric.label} style={[styles.metricCard, { backgroundColor: palette.surfaceElevated, borderColor: palette.border }]}>
              <View style={styles.metricHeader}>
                <View style={[styles.metricIcon, { backgroundColor: palette.surfaceMuted }]}>
                  <MaterialIcons name={metric.icon as IconName} size={18} color={toneColor(metric.tone, palette)} />
                </View>
                <ThemedText style={{ color: palette.muted, fontSize: 12, fontWeight: '700' }}>
                  {metric.label}
                </ThemedText>
              </View>
              <ThemedText type="title" style={styles.metricValue}>
                {metric.value}
              </ThemedText>
              <ThemedText style={{ color: palette.muted, fontSize: 13, lineHeight: 19 }}>
                {metric.detail}
              </ThemedText>
            </View>
          ))}
        </View>

        <SectionHeader title="Live alerts" subtitle="Latest safety, attendance, and maintenance signals." palette={palette} />
        <View style={[styles.alertPanel, { backgroundColor: palette.surfaceElevated, borderColor: palette.border }]}>
          {liveAlerts.map((alert, index) => (
            <View
              key={alert.title}
              style={[
                styles.alertRow,
                index < liveAlerts.length - 1
                  ? { borderBottomColor: palette.border, borderBottomWidth: StyleSheet.hairlineWidth }
                  : null,
              ]}>
              <View style={[styles.alertDot, { backgroundColor: toneColor(alert.tone, palette) }]} />
              <View style={styles.alertBody}>
                <ThemedText style={styles.alertTitle}>{alert.title}</ThemedText>
                <ThemedText style={{ color: palette.muted, fontSize: 13, lineHeight: 19 }}>
                  {alert.detail}
                </ThemedText>
              </View>
              <MaterialIcons name={alert.icon as IconName} size={20} color={toneColor(alert.tone, palette)} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionHeader({
  title,
  subtitle,
  palette,
}: {
  title: string;
  subtitle: string;
  palette: Palette;
}) {
  return (
    <View style={styles.sectionHeader}>
      <ThemedText type="subtitle">{title}</ThemedText>
      <ThemedText style={{ color: palette.muted, fontSize: 13, lineHeight: 18 }}>{subtitle}</ThemedText>
    </View>
  );
}

function toneColor(tone: 'danger' | 'warning' | 'success' | 'neutral', palette: Palette) {
  switch (tone) {
    case 'danger':
      return palette.danger;
    case 'warning':
      return palette.warning;
    case 'success':
      return palette.success;
    default:
      return palette.muted;
  }
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 18,
  },
  brandCluster: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  brand: {
    marginBottom: 2,
  },
  menuButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCard: {
    borderWidth: 1,
    borderRadius: 28,
    padding: 22,
    gap: 14,
  },
  heroAccent: {
    width: 42,
    height: 6,
    borderRadius: 999,
  },
  highlightBox: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    marginTop: 6,
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 10,
    gap: 4,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionTextBlock: {
    gap: 4,
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  metricCard: {
    width: '48%',
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  metricIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricValue: {
    fontSize: 30,
    lineHeight: 32,
    marginTop: 4,
  },
  actionCard: {
    width: '48%',
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
    gap: 10,
    justifyContent: 'space-between',
    minHeight: 154,
  },
  actionIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  menuOverlay: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  menuBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuSheet: {
    width: '82%',
    maxWidth: 340,
    height: '100%',
    borderRightWidth: 1,
    padding: 16,
    gap: 14,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  menuCloseButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuList: {
    gap: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemBody: {
    flex: 1,
    gap: 2,
  },
  menuItemTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  alertPanel: {
    borderRadius: 22,
    borderWidth: 1,
    overflow: 'hidden',
  },
  alertRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
  },
  alertDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
  },
  alertBody: {
    flex: 1,
    gap: 4,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  footerRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  primaryButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
});
