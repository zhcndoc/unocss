---
layout: page
title: Meet the Team
description: The development of UnoCSS is guided by an international team.
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamPageSection,
  VPTeamMembers
} from 'vitepress/theme'
import { teamMembers, teamEmeritiMembers } from './.vitepress/contributors'
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>认识团队</template>
    <template #lead>
      UnoCSS 的开发由一个国际团队指导，其中一些人选择在下面展示。
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="teamMembers" />
  <VPTeamPageSection>
    <template #title>团队成员</template>
    <template #lead>
      在这里，我们向一些不再活跃的团队成员致敬，他们在过去做出了宝贵的贡献。
    </template>
    <template #members>
      <VPTeamMembers size="small" :members="teamEmeritiMembers" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>