import React from "react"
import { MetaInfoProps } from "../../types/types"

export const MetaInfo: React.FC<MetaInfoProps> = ({ count, Icon }) => {
  const formattedCount = count > 99 ? "99+" : count
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <p className="text-default-400 text-xl hover:text-2xl ease-in duration-100">
        <Icon />
      </p>
      {count > 0 && (
        <sup className="font-semibold text-default-400 text-l">
          {formattedCount}
        </sup>
      )}
    </div>
  )
}
