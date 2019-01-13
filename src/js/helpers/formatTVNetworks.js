const MY_NETWORKS = ["ESPN", "TNT", "NBCSNW", "NBA TV"]

export const formatTVNetworks = networks =>
  networks
    .filter(n => n.type === "tv" && MY_NETWORKS.indexOf(n.disp) > -1)
    .map((n, idx) => ({
      channel: n.disp,
      unique_key: idx + "-" + n.disp.replace(/-|\s/g, "").toLowerCase()
    }))
